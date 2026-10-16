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
