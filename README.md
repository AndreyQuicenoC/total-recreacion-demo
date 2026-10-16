# Total Recreación — Demo

[![CI](https://github.com/AndreyQuicenoC/total-recreacion-demo/actions/workflows/ci.yml/badge.svg)](https://github.com/AndreyQuicenoC/total-recreacion-demo/actions/workflows/ci.yml)
[![CD](https://github.com/AndreyQuicenoC/total-recreacion-demo/actions/workflows/deploy.yml/badge.svg)](https://github.com/AndreyQuicenoC/total-recreacion-demo/actions/workflows/deploy.yml)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)
[![Node.js](https://img.shields.io/badge/node-%3E%3D20-brightgreen)](.nvmrc)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.7-blue)](package.json)
[![WCAG 2.1 AA](https://img.shields.io/badge/WCAG-2.1%20AA-005A9C)](docs/accessibility.md)

Demo frontend de portafolio para **Total Recreación** (Santiago de Cali, Colombia): empresa de recreación y coordinación de eventos (animación, comida de feria, sonido, gymkanas, fiestas infantiles y activaciones corporativas).

**Diseño y dirección de calidad:** [AndreyQuicenoC](https://github.com/AndreyQuicenoC) — criterios **WCAG 2.1 AA**, **ISO/IEC 25010**, alineación con buenas prácticas **OWASP** para la capa objetivo de backend.

> Esta versión es una **demo desplegable** (datos en `localStorage`, sin servidor). El README y `docs/` describen el **sistema productivo previsto** y los aprendizajes de negocio aplicados al diseño.

---

## Vista rápida

| Área | Rutas |
|------|--------|
| Público | `/`, `/sobre-nosotros` |
| Acceso | `/login` |
| Admin | `/admin`, `/admin/agenda`, `/admin/estadisticas`, … |

**Credenciales demo:** `admin@totalrecreacion.co` / `admin123`

---

## Aprendizajes de portafolio

1. **Modelo de negocio** — Canal comercial (landing + WhatsApp) + operación interna (agenda, utilidad por evento, equipo y material).
2. **Procesos críticos** — Reserva → checklist de material → asignación de recreadores → cierre con calificación y utilidad (`base + extras − costos`).
3. **Calidad ISO/IEC 25010** — Usabilidad (feedback con toasts, confirmaciones), mantenibilidad (módulos por dominio), portabilidad (Vite + React).
4. **Accesibilidad** — Perceptible y operable: skip link, tooltips en controles, foco visible, roles ARIA en navegación admin.
5. **Arquitectura objetivo** — API REST con PostgreSQL, JWT, validación Zod y despliegue containerizado (ver [docs/architecture.md](docs/architecture.md) y [docs/BACKEND.md](docs/BACKEND.md)).

---

## Stack (implementado)

- **React 18** + **TypeScript** + **Vite 6**
- **React Router 7** — rutas públicas y panel admin
- **Tailwind CSS 4** + **Radix UI / shadcn**
- **Motion**, **Recharts**, **Sonner**
- Persistencia demo: **Context + localStorage**

---

## Stack previsto (productivo)

| Dominio | Tecnología |
|---------|------------|
| API | Node 20, Fastify, OpenAPI 3.1 |
| Datos | PostgreSQL 15, Prisma |
| Auth | JWT + refresh HTTP-only, Argon2 |
| Validación | Zod (compartido front/back) |
| Archivos | S3-compatible (PDFs, galería) |
| Seguridad | OWASP ASVS L2, rate limiting, CORS estricto, headers CSP |
| Observabilidad | Pino, OpenTelemetry |
| CI/CD | GitHub Actions, Docker, Fly.io / Railway |

Detalle: [docs/BACKEND.md](docs/BACKEND.md), [docs/architecture.md](docs/architecture.md).

---

## Documentación

| Documento | Contenido |
|-----------|-----------|
| [docs/PROJECT.md](docs/PROJECT.md) | Dominio, funcionalidades, modelo de datos |
| [docs/code-structure.md](docs/code-structure.md) | Estructura del código frontend |
| [docs/implementation-report.md](docs/implementation-report.md) | Implementación y validación V1/V2 |
| [docs/integration-report.md](docs/integration-report.md) | Validación E2E demo (integrador) |
| [docs/accessibility.md](docs/accessibility.md) | WCAG 2.1 AA aplicado |
| [docs/deployment.md](docs/deployment.md) | Despliegue estático |
| [CHANGELOG.md](CHANGELOG.md) | Historial de versiones |

---

## Desarrollo local

```bash
npm install
npm run dev
```

Build de producción:

```bash
npm run verify   # alias: npm run build
npm run preview  # servir dist/
```

Requisitos: **Node.js 20+**.

---

## Despliegue

Listo para **Vercel** (`vercel.json`) o **Netlify** (`netlify.toml`). Comando de build: `npm run build`, carpeta de salida: `dist/`.

Guía paso a paso: [docs/deployment.md](docs/deployment.md).

---

## Licencia

[MIT](LICENSE) — Copyright (c) 2026 AndreyQuicenoC.

---

## Créditos

- Prototipo visual base generado con **Figma Make** (adaptado y endurecido para producción demo).
- Marca **Total Recreación** — uso demostrativo en portafolio.
