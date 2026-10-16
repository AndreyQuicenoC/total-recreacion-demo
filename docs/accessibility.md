# Accesibilidad — WCAG 2.1 AA

**Responsable de criterios de calidad:** AndreyQuicenoC

## Principios aplicados en la demo

### Perceptible

- Idioma del documento: `lang="es"` en `index.html`
- Textos alternativos en iconos interactivos vía `aria-label`
- Contraste de marca validado en componentes existentes (foco en no alterar diseño)

### Operable

- **2.4.1 Bypass Blocks:** enlace «Saltar al contenido principal» en layouts público y admin
- **2.4.7 Focus Visible:** estilos `focus-visible` en `Button` y controles nativos
- **Tooltips:** Radix Tooltip en `Button` y `WithTooltip` para `<button>` nativos
- Navegación admin con `aria-label="Navegación administrativa"`
- Toggles de filtros con `aria-pressed`

### Comprensible

- Formularios con `<Label htmlFor>` y mensajes de error asociados (`aria-invalid`, `aria-describedby` en login)

### Robusto

- Componentes Radix con roles ARIA implícitos en diálogos, menús y tooltips

## Limitaciones de la demo

- Calificación por estrellas: patrón visual; nombre accesible vía tooltip y `aria-label`
- PDF/calendar: acciones que abren ventanas externas — requieren aviso en productivo

## Próximos pasos (productivo)

- Auditoría automatizada (axe-core en CI)
- Pruebas con lector de pantalla (NVDA/VoiceOver)
- Modo de alto contraste opcional
