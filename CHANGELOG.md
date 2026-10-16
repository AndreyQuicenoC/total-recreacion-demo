# Changelog

All notable changes to this project are documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.0.0] - 2026-10-15

### Added

- Demo frontend completa de Total Recreación: landing, sobre nosotros, login y panel administrativo.
- Tooltips accesibles en botones y controles nativos (Radix Tooltip + `WithTooltip`).
- Enlace «Saltar al contenido principal» (WCAG 2.4.1) en layouts público y admin.
- Documentación de portafolio: README, arquitectura objetivo, backend previsto, accesibilidad y despliegue.
- Configuración de despliegue estático (Vercel / Netlify) con rewrites SPA.
- Metadatos del proyecto: licencia MIT, changelog, tsconfig y editorconfig.

### Changed

- `Button` expone tooltip automático desde `aria-label`, `title` o texto visible.
- Proveedor global de tooltips en la aplicación para consistencia operable.

### Security

- Documentación OWASP ASVS / Top 10 aplicada al diseño objetivo del backend (JWT, Argon2, validación Zod).

[1.0.0]: https://github.com/AndreyQuicenoC/total-recreacion-demo/releases/tag/v1.0.0
