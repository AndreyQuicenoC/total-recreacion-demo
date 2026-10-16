# Total Recreación — Plataforma de Coordinación de Eventos

## Descripción general

Plataforma web para la empresa **Total Recreación** (Santiago de Cali, Colombia). Centraliza el flujo de
coordinación de eventos recreativos (animación, comida de feria, sonido, máquinas de humo, gymkanas, pool parties,
fiestas infantiles, hora loca, baby showers y activaciones corporativas).

La plataforma se divide en dos zonas:

1. **Zona pública (no autenticada)** — Landing comercial con catálogo de planes, página *Sobre Nosotros*,
   integración directa a WhatsApp y CTA para reclutamiento.
2. **Zona administrativa (autenticada)** — Panel completo de coordinación: agenda, equipo, clientes,
   etiquetas, categorías, planes, plantillas de material, estadísticas y edición de perfil.

## Autoría de la demo

Diseño profesional, criterios **WCAG 2.1 AA** e **ISO/IEC 25010**: **AndreyQuicenoC** (2026).

## Cumplimiento

- **ISO/IEC 25010** — Calidad funcional (CRUD completos con validaciones), confiabilidad (persistencia
  local con sincronización en `localStorage`), usabilidad (mensajes claros en español, retroalimentación
  vía toasts, confirmaciones de eliminación), eficiencia (paginación + búsqueda en todas las tablas),
  mantenibilidad (estructura modular por feature) y portabilidad (React + Tailwind + Vite, libre de
  dependencias propietarias).
- **WCAG 2.1 AA** — Roles ARIA en navegación, `aria-label` en iconos interactivos, contraste de color
  validado, focus visible vía Tailwind `focus-visible`, `aria-invalid` en errores de formulario,
  controles de teclado completos en todos los diálogos.

## Stack frontend

| Capa | Tecnología |
|------|------------|
| Framework | React 18 + TypeScript |
| Routing | `react-router` v7 |
| UI | Tailwind CSS v4 + componentes shadcn/Radix |
| Animaciones | `motion/react` |
| Carruseles | `embla-carousel-react` |
| Gráficas | `recharts` |
| Notificaciones | `sonner` |
| Build | Vite 6 |

## Estructura

```
src/app/
├── App.tsx                # Router principal
├── lib/
│   ├── types.ts           # Modelos de dominio
│   ├── store.tsx          # Context global con persistencia local
│   ├── seed.ts            # Datos de ejemplo
│   └── helpers.ts         # Utilidades (WhatsApp, Calendar, PDF, formato COP)
├── components/
│   ├── common/            # DataTable, ConfirmDelete, PageHeader, LogoMark
│   ├── layout/            # Navbar, Footer, PublicLayout, AdminLayout
│   ├── ui/                # Primitivas shadcn
│   └── figma/             # ImageWithFallback
└── pages/
    ├── Landing.tsx        # Hero + carruseles por categoría + CTA
    ├── About.tsx          # Página corporativa tipo revista
    ├── Login.tsx          # Acceso de administradores
    └── admin/
        ├── Dashboard.tsx
        ├── Recreadores.tsx
        ├── Clientes.tsx
        ├── Etiquetas.tsx
        ├── Categorias.tsx
        ├── Planes.tsx
        ├── Material.tsx
        ├── Agenda.tsx
        ├── Estadisticas.tsx
        └── Perfil.tsx
```

## Modelo de datos (resumen)

- **Tag** — etiquetas reutilizables (color, descripción).
- **Recreator** — miembro del equipo (sueldo, etiqueta, cursos, fecha de ingreso).
- **Client** — perfil del cliente con descripción extendida.
- **Category** — agrupa planes (genera carruseles del landing).
- **Plan** — producto comercial con precio base, extras (`amount + reason`), inclusiones,
  mensaje predefinido para WhatsApp.
- **MaterialTemplate** — plantilla de checklist de materiales.
- **ScheduledEvent** — evento agendado: vincula `plan`, `client`, `recreators`, `materialCost`,
  `transportCost`, checklist transformada (solo se chequea desde detalle), `rating` y `utility`
  calculada (`base + extra − sueldos − transporte − material`).
- **ClickEvent** — tracking anónimo de clicks a planes del landing.

## Funcionalidades clave

- Carruseles por categoría en el landing (cada card lleva a WhatsApp con un mensaje personalizado por plan).
- CTA "Quiero saber más detalles" en el hero.
- Tracking de clicks por plan (diario y mensual) → visible en *Estadísticas*.
- Tabla unificada con búsqueda multi-campo, paginación y columna de acciones
  (Ver al detalle / Previsualizar / Editar / Eliminar). El eliminar siempre exige confirmación.
- *Previsualizar* abre un overlay compacto con opción de "Ver al detalle" o "Cerrar".
- Agenda con filtros por estado (Actuales / Anteriores / Todos — por defecto *Actuales*), por categoría,
  por plan y por recreador.
- Detalle de evento con:
  - Checklist editable con toggle de verificación.
  - Calificación post-evento (1–5) con comentario.
  - Botón **Agendar en Calendar** que genera URL `calendar.google.com/calendar/render` sin OAuth.
  - Botón **Descargar PDF** con resumen económico completo.
- Estadísticas con: cards de resumen, gráficas de barras de ingresos/gastos/utilidad, eventos por
  recreador, eventos por cliente, distribución por categoría, calificación promedio y serie diaria de clicks.
- Generación de **PDF consolidado** desde estadísticas con todos los datos relevantes.
- Eliminar etiqueta deja a los recreadores asociados como *Sin etiqueta*.

## Credenciales demo

```
admin@totalrecreacion.co / admin123
```
