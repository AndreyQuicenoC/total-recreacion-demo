# Backend de Total Recreación — Documentación Técnica

> Especificación del backend que da soporte al frontend ya construido. Esta documentación define los
> contratos esperados, las tecnologías recomendadas y la estructura profesional de directorios.

## Stack recomendado

| Capa | Tecnología | Motivación |
|------|------------|------------|
| Lenguaje | **Node.js 20 + TypeScript** | Coherente con el stack frontend, tipos compartidos. |
| Framework HTTP | **Fastify** (o Express) | Alto rendimiento, plugins maduros. |
| Persistencia | **PostgreSQL 15** | Relaciones claras entre planes, eventos, recreadores. |
| ORM | **Prisma** | Migraciones tipadas, ergonomía DX. |
| Autenticación | **JWT** + Argon2 para hashing | Sesiones cortas + refresh tokens HTTP-only. |
| Almacenamiento de archivos | **S3-compatible** (MinIO/Backblaze) | PDFs generados y galería del equipo. |
| Validación | **Zod** | Validación de inputs reutilizable entre back y front. |
| Documentación API | **OpenAPI 3.1** vía `fastify-swagger` | Contratos navegables. |
| Pruebas | **Vitest** + **Supertest** | Suite rápida e idiomática. |
| Observabilidad | **Pino** logs + OpenTelemetry | Trazabilidad ISO/IEC 25010. |
| Despliegue | Docker + Fly.io / Railway | Onboarding sencillo. |

## Estructura de directorios sugerida

```
backend/
├── src/
│   ├── server.ts                # Bootstrap Fastify
│   ├── config/
│   │   ├── env.ts               # Cargar y validar variables (Zod)
│   │   └── logger.ts
│   ├── plugins/
│   │   ├── auth.ts              # JWT, decorators de request.user
│   │   ├── cors.ts
│   │   └── prisma.ts
│   ├── modules/
│   │   ├── auth/
│   │   │   ├── auth.routes.ts
│   │   │   ├── auth.service.ts
│   │   │   └── auth.schema.ts
│   │   ├── tags/
│   │   ├── recreators/
│   │   ├── clients/
│   │   ├── categories/
│   │   ├── plans/
│   │   ├── materials/
│   │   ├── events/
│   │   │   ├── events.routes.ts
│   │   │   ├── events.service.ts
│   │   │   ├── events.utility.ts   # Cálculo de utilidad
│   │   │   └── events.pdf.ts       # Generación de PDF (pdfkit)
│   │   ├── clicks/
│   │   └── stats/
│   ├── middlewares/
│   ├── utils/
│   └── types/
├── prisma/
│   ├── schema.prisma
│   └── migrations/
├── tests/
│   ├── unit/
│   └── integration/
├── docker/
│   ├── Dockerfile
│   └── docker-compose.yml
├── .env.example
└── package.json
```

## Modelo Prisma (resumen)

```prisma
model AdminUser {
  id        String  @id @default(cuid())
  name      String
  email     String  @unique
  password  String  // argon2 hash
  avatar    String?
  createdAt DateTime @default(now())
}

model Tag {
  id          String  @id @default(cuid())
  name        String
  color       String
  description String?
  recreators  Recreator[]
  materials   MaterialTemplate[]
}

model Recreator {
  id         String   @id @default(cuid())
  fullName   String
  phone      String
  email      String?
  documentId String?
  joinDate   DateTime
  courses    String[]
  salary     Int
  tag        Tag?     @relation(fields: [tagId], references: [id], onDelete: SetNull)
  tagId      String?
  events     EventRecreator[]
}

model Client {
  id            String   @id @default(cuid())
  name          String
  phone         String
  municipality  String
  email         String?
  address       String?
  documentId    String?
  description   String?
  events        ScheduledEvent[]
}

model Category {
  id          String  @id @default(cuid())
  name        String
  description String?
  color       String?
  plans       Plan[]
}

model Plan {
  id               String   @id @default(cuid())
  category         Category @relation(fields: [categoryId], references: [id])
  categoryId       String
  name             String
  basePrice        Int
  description      String
  audience         String
  whatsappMessage  String
  extras           PlanExtra[]
  includes         PlanInclude[]
  events           ScheduledEvent[]
}

model PlanExtra   { id String @id @default(cuid()); plan Plan @relation(fields: [planId], references: [id], onDelete: Cascade); planId String; amount Int; reason String }
model PlanInclude { id String @id @default(cuid()); plan Plan @relation(fields: [planId], references: [id], onDelete: Cascade); planId String; label  String }

model MaterialTemplate {
  id         String @id @default(cuid())
  name       String
  description String?
  tag        Tag?    @relation(fields: [tagId], references: [id], onDelete: SetNull)
  tagId      String?
  items      MaterialItem[]
}
model MaterialItem { id String @id @default(cuid()); template MaterialTemplate @relation(fields: [templateId], references: [id], onDelete: Cascade); templateId String; label String }

model ScheduledEvent {
  id              String   @id @default(cuid())
  title           String
  description     String
  address         String
  contactPhone    String?
  date            DateTime
  startTime       String
  endTime         String
  plan            Plan     @relation(fields: [planId], references: [id])
  planId          String
  selectedExtraId String?
  client          Client   @relation(fields: [clientId], references: [id])
  clientId        String
  recreators      EventRecreator[]
  checklist       EventChecklistItem[]
  transportCost   Int      @default(0)
  materialCost    Int      @default(0)
  rating          Int?
  ratingComment   String?
  utility         Int      @default(0)
  createdAt       DateTime @default(now())
}

model EventRecreator { event ScheduledEvent @relation(fields:[eventId], references:[id], onDelete:Cascade); eventId String; recreator Recreator @relation(fields:[recreatorId], references:[id]); recreatorId String; @@id([eventId, recreatorId]) }

model EventChecklistItem { id String @id @default(cuid()); event ScheduledEvent @relation(fields:[eventId], references:[id], onDelete:Cascade); eventId String; label String; done Boolean @default(false) }

model ClickEvent { id String @id @default(cuid()); plan Plan @relation(fields:[planId], references:[id]); planId String; at DateTime @default(now()) }
```

## Contratos REST esperados

Prefijo: `/api/v1`. Todos los endpoints administrativos requieren `Authorization: Bearer <jwt>`.

### Autenticación
- `POST /auth/login` — `{ email, password }` → `{ token, user }`.
- `POST /auth/refresh` — usa cookie HTTP-only.
- `POST /auth/logout`.

### CRUD genérico
Para cada uno de los recursos (`tags`, `recreators`, `clients`, `categories`, `plans`, `materials`):
- `GET    /<resource>` — paginado: `?q=&page=&pageSize=`.
- `GET    /<resource>/:id`.
- `POST   /<resource>`.
- `PATCH  /<resource>/:id`.
- `DELETE /<resource>/:id`.

### Eventos
- `GET    /events` — filtros: `status=upcoming|past|all`, `categoryId`, `planId`, `recreatorId`.
- `POST   /events` — el backend calcula `utility` (ver módulo `events.utility.ts`).
- `PATCH  /events/:id` — incluye `checklist`, `rating`, `ratingComment`.
- `DELETE /events/:id`.
- `GET    /events/:id/pdf` — genera un PDF profesional.
- `GET    /events/:id/calendar-link` — devuelve la URL Google Calendar (sin OAuth).

### Clicks (público)
- `POST   /clicks` — `{ planId }` (sin auth). Aplica rate-limit por IP.

### Estadísticas
- `GET /stats/summary?year=` — agregados anuales/mensuales.
- `GET /stats/recreators` — eventos por recreador.
- `GET /stats/clients`.
- `GET /stats/clicks?range=daily|monthly`.
- `GET /stats/pdf` — consolidado PDF.

## Cálculo de utilidad (canónico)

```
utility = (plan.basePrice + selectedExtra?.amount) 
        − Σ recreator.salary 
        − event.transportCost 
        − event.materialCost
```

El cálculo debe ejecutarse en backend tras cada `PATCH`/`POST` para evitar inconsistencias.

## Seguridad

- Contraseñas con **Argon2id** (parámetros: m=64MB, t=3, p=4).
- Rate limit en `/auth/login` (5 intentos / 10 min por IP).
- Validación estricta con Zod en el límite de cada handler.
- CORS restringido al dominio del frontend.
- Headers de seguridad: `helmet` (CSP, HSTS).
- Logs de auditoría para todas las operaciones admin (quién hizo qué, cuándo).
- Cumplimiento Ley 1581 de 2012 (Colombia): endpoint `DELETE /me/data` para portabilidad / supresión.

## Variables de entorno (`.env.example`)

```
DATABASE_URL=postgres://user:pass@localhost:5432/totalrecreacion
JWT_SECRET=change-me
JWT_REFRESH_SECRET=change-me-too
S3_ENDPOINT=
S3_BUCKET=
S3_ACCESS_KEY=
S3_SECRET_KEY=
ALLOWED_ORIGIN=https://app.totalrecreacion.co
LOG_LEVEL=info
```

## Pipeline CI

```
- lint        → eslint + prettier
- type-check  → tsc --noEmit
- test        → vitest run
- build       → tsc -p tsconfig.build.json
- docker      → docker build
```
