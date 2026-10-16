# Despliegue

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
