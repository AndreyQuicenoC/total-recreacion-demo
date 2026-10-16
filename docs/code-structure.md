# Estructura del código

## Frontend

### Páginas

- `/` — `Landing.tsx` (HU-PORTFOLIO-001) — Catálogo comercial y carruseles
- `/sobre-nosotros` — `About.tsx`
- `/login` — `Login.tsx`
- `/admin/*` — módulos admin (`Dashboard`, `Recreadores`, `Clientes`, `Etiquetas`, `Categorias`, `Planes`, `Material`, `Agenda`, `AgendaDetail`, `Estadisticas`, `Perfil`)

### Componentes

- `WithTooltip` (HU-PORTFOLIO-001) — wrapper Radix para controles nativos
- `Button` (HU-PORTFOLIO-001) — tooltip automático vía `aria-label` / texto
- `DataTable`, `ConfirmDelete`, `PageHeader`, `LogoMark`
- `PublicLayout`, `AdminLayout`, `Navbar`, `Footer`
- `components/ui/*` — primitivas shadcn/Radix

### Estado y dominio

- `lib/store.tsx` — Context global + persistencia `localStorage`
- `lib/types.ts`, `lib/seed.ts`, `lib/helpers.ts`

### App shell

- `App.tsx` — `TooltipProvider`, router, toasts

## Backend (previsto — no implementado en demo)

Ver [BACKEND.md](BACKEND.md) y [architecture.md](architecture.md).

## Estructuras críticas

| Path | Motivo | Cambios permitidos |
|------|--------|-------------------|
| `src/app/lib/store.tsx` | Persistencia y auth demo | Solo si no rompe datos seed |
| `src/styles/*`, tokens de marca | Identidad visual Figma | No modificar paleta/layout |
| `vite.config.ts` | Resolver assets Figma | Solo alias/build |
| `.ai/` | Framework interno | Ignorado en git |
