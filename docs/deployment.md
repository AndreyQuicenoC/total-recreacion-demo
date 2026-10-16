# Despliegue

## CI/CD (GitHub Actions)

| Workflow | Archivo | Disparador | Propósito |
|----------|---------|------------|-----------|
| **CI** | `.github/workflows/ci.yml` | push/PR a `main` | `npm ci`, typecheck, build, audit high+, artifact `dist` |
| **CD** | `.github/workflows/deploy.yml` | push a `main` | Build con `VITE_BASE_PATH` y deploy a **GitHub Pages** |

Pipeline local equivalente:

```bash
npm ci
npm run ci
npm audit --audit-level=high
```

Para GitHub Pages: en el repo, **Settings → Pages → Source: GitHub Actions**. El workflow **CD** se lanza con **Actions → CD → Run workflow** (no en cada push, para no duplicar tu deploy en Vercel).

### Si CI falla sin logs de build

GitHub puede rechazar jobs con: *「The job was not started because your account is locked due to a billing issue」*. Solución: [GitHub Billing](https://github.com/settings/billing) — regularizar pago o habilitar Actions en repos públicos. El pipeline es válido: verificar con `npm run ci` en local.

## Build

```bash
npm ci
npm run build
```

Salida: carpeta `dist/` (assets estáticos).

## Vercel

1. Importar repositorio `total-recreacion-demo`
2. Framework preset: **Vite**
3. Build command: `npm run build`
4. Output directory: `dist`
5. El archivo `vercel.json` ya define rewrites SPA

## Netlify

1. Build command: `npm run build`
2. Publish directory: `dist`
3. Usar `netlify.toml` incluido

## Variables de entorno

La demo no requiere variables. En producción:

- `VITE_API_URL`
- Claves solo en backend (nunca `VITE_*` para secretos)

## Post-despliegue

- Probar `/login` y flujo admin
- Verificar rutas profundas (`/admin/agenda`) recargando la página (rewrite SPA)

## Publicar en GitHub

El repositorio local ya incluye rama `main`, tag `v1.0.0` y remote `origin`:

```bash
# 1. Crear en GitHub un repo vacío: AndreyQuicenoC/total-recreacion-demo (sin README)
# 2. Empujar código y tags
git push -u origin main --tags

# 3. Release (con GitHub CLI instalado)
gh release create v1.0.0 --title "v1.0.0 — Demo Total Recreación" \
  --notes "Demo frontend de portafolio: WCAG 2.1 AA, ISO/IEC 25010, documentación completa."
```

En Windows, si `npm install` falla por certificados SSL:

```powershell
$env:NODE_OPTIONS="--use-system-ca"
npm install
```
