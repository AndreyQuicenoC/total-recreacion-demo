## Rol

Tú eres un Desarrollador de Software Senior profesional líder de con más de 15 años de experiencia, de alto nivel y experto tanto en frontend como en backend, conocedor de diseño de proyectos orientados a arquitecturas escalables. Tu conjunto clave de conocimientos es:

- Experticia en desarrollo web orientado a las pautas de usabilidad.
- Experticia en diseño UX/UI profesional alineándote a las mejores estrategias de diseño y estética modernas y comerciales.
- Experto en SEO para posicionamiento y crecimiento exponencial empresarial.
- Experto en diseño de navbar especializados y profesionales, experto en el uso de cards, carruseles, CTAs, Hero sections y demás elementos de alto nivel, maquetación y estética de plataformas de diseño de alto alcance.
- Experto en conocimientos de recreación y contenido orientado a un público general que busca entretenimiento y experiencias de gran alcance en eventos recreativos representados en el desarrollo de software

---

## Objetivo

El objetivo clave de esta plataforma es centralizar el flujo de trabajo de coordinación de eventos en recreación para la empresa Total Recreación de la Ciudad de Cali, material recreativo, variedad de comida durante los eventos recreativos, material de sonido, máquinas de humo, etc. Hasta ahora su flujo ha sido a mano, por medio de hojas, whatsapp y memoria humana para organizar, gestionar y cerrar acuerdos de eventos con usuarios finales o corporaciones, este flujo supone un riesgo de dificultades en el proceso, un desgaste mental y fallos en planeación. Para ello se propone un sistema que centralice y organice el flujo de trabajo, con el plus del análisis estadístico completo de la actividad general de las planeaciones, siendo el foco empresarial el agendamiento de eventos recreativos.

### Objetivos específicos.

- Es de vital importancia construir un profesional Dashboard o Inicio disponible para todo público, donde pueda conocer información de los eventos y habrá un carrusel de opciones de los distintos tipos de eventos, otro carrusel de los planes como de comida, otro carrusel de planes de elementos de sonido, máquinas de humo, máquinas para eventos. Estos elementos del carrusel deben llevar a un mensaje construido particularmente a cada card que lleve a whatsapp para solicitar más información del plan en particular.
- Debe haber un navbar perfectamente construido con un diseño llamativo profesional y estético, navegable y claro
- Debe haber un footer con mapa de sitio que incluya todos los links relevantes y que lleve además un link a términos y condiciones y de políticas, que despliegue los debidos overlay estéticamente construidos con la información correspondiente
- Un link de Sobre Nosotros para mostrar la trayectoria, años de experiencia, equipo de recreación, con imagenes de recreación, con un estilo tipo revista profesional estetica lleno de detalles y elementos estético. Debe tener una sección Únete a nuestro equipo llamativa con un link a whatsapp con un mensaje que busque solicitar información para trabajar con nosotros.
- Zona de Login, este apartado es únicamente para administradores: que solicite correo y contraseña y haya un ojo para ver o no ver contraseña, además que si la contraseña fue incorrecta de el feedback correspondiente dentro del campo.
- Una vez inicie sesión es ideal tener las siguientes secciones únicamente cuando se está autenticado:
    - Inicio o dashboard: Dentro del navbar debe estar la opción, aquí hay un resumen de los eventos de la semana, recreadores asignados con su evento y link a las secciones correspondientes a agenda para ver los eventos como zona de resumen, número resumido de eventos del mes, número resumido de eventos del año, promedio de eventos por semana en el año, promedio de eventos por mes en el año y demás información de resumen que consideres relevante.
    - Equipo de recreadores: Dentro del navbar debe estar la opción, aquí se definen los recreadores de la empresa, tiempo de experiencia que se calcula al poner la fecha de ingreso, número de contacto, correo opcional, nombre completo, cédula opcional, cursos a los que ha ido, sueldo actual el valor únicamente numérico, además de una etiqueta predefinida desde la pestaña de etiquetas que podría contemplar opciones (nuevo, aprendiz, bueno, recreador y experto) que puedes definir para el ejemplo, pero que luego se puedan editar o crear más de la mano del usuario.
    - Clientes: Dentro del navbar debe estar la opción, aquí se pre definen clientes para los eventos con sus nombres, número de contacto, municipio, correo opcional, dirección opcional, cédula opcional y una descripción extensa para dar información de preferencias, tipos de eventos, etc. al gusto del administrador para perfilar al cliente.
    - Etiquetas: Dentro del navbar debe estar la opción, se definen las etiquetas mencionadas en Equipo de recreadores con la opción de editar, crear, eliminar. Si una etiqueta se elimina y un recreador del equipo estaba asociado a ella debe pasar a aparecer como Sin etiqueta, para posteriormente asociar otra.
    - Categorías de planes: Dentro del navbar debe estar la opción, antes de definir planes es clave definir categorías, ejemplo, eventos infantiles, comida, equipo de eventos, etc. A partir de estas categorías es que se deben generar los carruseles del inicio no autenticado, lo que se hará es que se tomarán las categorías y se hará un carrusel por categoría.
    - Planes: Dentro del navbar debe estar la opción, se predefinan los planes asociados a categorías, estos planes se verán en cards dentro de los carruseles del inicio no autenticado, así que deben tener atributos como: Nombre, valor en dinero, la posibilidad de agregar un valor extra aparte del valor base (ejemplo: valor de evento con sonido) pero debe ser general pues puede ser un valor extra por diversas razones entonces para ello debe estar el valor y el motivo del valor (ejemplo: valor (300000), motivo (evento con sonido)), descripción, tipo de público, mensaje de whastapp predefinido para cuando se presione el botón en el inicio no autenticado, además una lista de lo que incluye como elementos independientes dentro de lo mismo, pudiendo agregar más o eliminar algunos (ejemplo: 2 animadores, juegos temáticos, material didáctico, desafío total, hora loca, etc.)
    - Material: Dentro del navbar debe estar la opción, en esta sección se deben predefinir conjuntos de listas de materiales, ejemplo, evento Marca Norma (pinta caritas, pinceles, material corporativo, infladores, globos) o evento Piscina (pista enjabonada, pinceles, globos, etc.) y así para los distintos elementos predefinidos para diferentes tipos de fiestas o eventos. Para ello se requiere Nombre, descripción, etiqueta, lista de elementos indefinida e ilimitada.  La idea de esta sección es predefinir listas/plantillas de materiales para agilizar el listado de materiales en Agenda.
    - Agenda: Dentro del navbar debe estar la opción, esta sección bebe de todas las demás, a la hora de agendar un evento se debe escoger un plan de los existentes, se debe asociar a un cliente existente, se debe asociar a un material predefinido o crear una lista nueva únicamente para este evento agendado (el objetivo del material es que una vez se agende el evento, llegada la fecha, se debe convertir la lista de material en una checklist que cambie de estado, true or false, por defecto false y a medida que se chequean elementos como verificados se cambia a true presionando un checkbox, pero esto solo ocurre una vez ya esta agendado el evento y se accede al detalle de este) además de que a pesar de que se use un material predefinido sea posible agregar más elementos teniendo de base los de la plantilla de materiales usada., título de evento, descripción del evento, ubicación del evento o dirección, número de contacto opcional, fecha del evento, hora de inicio y hora de fin, asociar recreadores predefinidos antes (el número de recreadores para asociar es ilimitado, pero en la práctica el usuario puede agregar 1, 2 o 3 con frecuencia por lo que debe estar la opción de poder poner varios o 1, pero nunca ninguno), por último calificación, esta no se define al agendar el evento sino después como algo opcional, para saber la calificación de un evento en particular y un comentario de evento opcional también para saber la opinión del cliente; por último, en el proceso de crear o agendar el evento debe poderse colocar el costo del transporte, además, se debe calcular un campo extra llamado Utilidad, que el sistema calcula (se calcula a partir del costo base del evento, escogiendo si es el valor base de un plan, o por ejemplo un valor de un evento con sonido, menos la suma del sueldo de los recreadores asociados, menos el transporte y un campos opcional de Gastos en material. Todo esto da como resultado la utilidad del evento que se debe almacenar en una variable en la base de datos). Toda la información anterior debe poderse ver en Ver al detalle de determinada
    - Estadísticas: Dentro del navbar debe estar la opción, esta página es una recopilación de información relevante, debe haber cards para: número de eventos el totales, número de eventos mensuales, número de eventos semanales, suma todo lo ganado en eventos actualmente, suma de todo lo ganado en eventos por mes netamente sumando el costo de lso eventos, número de gastos por mes sumando el costo por recreadores y costo de transporte y gastos extra si los hay. y un card de la suma de las utilidades para saber la utilidad total todo esto para el año actual. Del mismo modo para ingresos, gastos y utilidad deben haber diagrama de barras por cada uno, deben haber estadísticas para saber el número de eventos al que ha ido cada recreador, el número de eventos que ha agendado todos y cada uno de los clientes, para esto si es necesario usar tablas o elementos gráficos que consideres ideales. Además, debe haber un promedio de calificaciones y algo que diga el total de calificaciones que se han almacenado. Piensa en más estadísticas y gráficos a partir del modelo de negocio entendiendo a la perfección para darle un dashboard de estadísticas profesional al administrador
    - Editar perfil: Icono de persona con opciones de editar perfil y cerrar sesión.

---

## Restricciones

### Restricciones fuertes

- Analiza primero el prompt, busca fuentes complementarias que apoyen y enriquezcan a nivel de contenido, mensaje, comunicación, diseño y desarrollo de la web. Posteriormente sí comienza a hacer todo lo solicitado.
- Todos los campos en tablas deben una columna de acciones donde para todos haya los botones como iconos de Ver al detalle (icono de ver al detalle), previsualizar (icono de ojo), editar (icono de lápiz) y eliminar (icono eliminar). Esto debe estar en todas las tablas  o contenedores de las páginas que tengan las instancias (deben estar las acciones para Equipo de recreadores, clientes, etiquetas, categorías, planes y material)
- Todos los campos de eliminar deben tener un paso de validación de “estás seguro de eliminar” correspondiente en mensaje al contenido a eliminar, este se debe mostrar como un overlay.
- Los Previsualizar deben ser overlays con opción de ver al detalle o cerrar.
- Agrega un botón de descargar en pdf en la sección de ver al detalle de una evento en agenda, para descargar toda la información relevante de todo lo agendado relacionado para el evento para un estilo de pdf profesional.
- Agrega una opción de generar un pdf en la sección de estadísticas que reúna todo el contenido, cards gráficos y demás de forma clara, organizada, con titulos, comentarios y organizado en varias páginas.
- Construye la documentación del proyecto profesionalmente, agrega una documentación que haga un paga generalizado de toda la web, todas sus funcionalidades y contratos esperados. Crea una documentación extensa y profesional que de instrucción de todas las tecnologías a incluir en el backend, la estructura de directorios y archivos profesional en el backend para que conecte debidamente con el frontend. Has ambas documentaciones de forma profesional en formato md únicamente en el código, no menciones nada de ellas en la parte visual web, solo guardalas como documentación en .md.
- Si hay tablas de registros a lo largo de las diferentes páginas  (en Equipo de recreadores, clientes, etiquetas, categorías, planes y material), el formato de tablas debe ser igual en todo, así mismo el estilo de de la columna de acciones, por otro lado, debes agregar paginación en todas ellas para cuando haya numerosa cantidad de registros. Además, debes agregar un campo de búsqueda en todas estas paginas para encontrar con más facilidad los registros usando varias características de los registros para facilitar la búsqueda (por ejemplo, en Equipo de recreadores, debe poderse buscar un recreador por su nombre, por su numero de telefono o por su cedula)
- La parte de Agenda hazla a tu preferencia, si contenedores, cards, lo que consideres que es la forma ideal para visualizar la agenda del mes. Debe ser posible además ver los eventos ya finalizados pero que fueron agendados antes, pero por defecto no se deben ver, por defecto solo se verán los actuales para hoy en adelante, una vez pase el día ya no se verán. Para poder visualizarlos debe haber un filtro por estado (Actuales, Anteriores, Todos; por defecto estará en actuales), también debe haber filtros de eventos por categoría, por plan y por recreador. Estos filtros deben estar muy bien construidos, estéticos y fáciles y amigables con el usuario a la hora de editarlos.
- Debe haber la posibilidad de asociar un evento para enviar la info a google calendar sin necesidad de autenticación con google, revisa si hay esta posibilidad. Para ello propongo que a partir de ciertos datos del evento se genere una url del estilo 
`https://calendar.google.com/calendar/render?action=TEMPLATE&text=Día+de+Piscina+-+Total+Recreacion&dates=20260620T150000Z/20260620T210000Z&details=Jornada+recreativa+en+la+piscina.+Recuerda+llevar+traje+de+baño,+toalla+y+protector+solar.&location=Total+Recreacion,+Calle+Ejemplo+123,+Cali,+Valle+del+Cauca,+Colombia Esta` 
Esta como tal es una plantilla, pero a partir de los datos que se proporcionan de un evento debe ser posible generar una url de este estilo, a partir del titulo, fecha, hora de inicio y fin del evento, dirección y si llega a ser posible agregar una descripción, que se haga una descripción compuesta concatenada que sea (descripción del evento agendado + cliente + recreadores asignados) en un formato claro y legible, ejemplo  de descripción + cliente + recreadores “Evento recreativo de piscina para Viviana Bernal, irán los recreadores Heidy Duque y Felipe Lago”. Con esto se cumplirían para el link los detalles &text, &dates &details y &location. Esto como tal debe ser un botón presente en Ver al detalle, que se llame por el estilo a ‘Agendar en calendar’. Hazlo que funcione correctamente y que de ninguna manera requiera oauth en el contacto con calendar para que la integración sea amigable con el usuario.
- No dejes ningun detalle sin acabar ni pulir, encargate de todo debidamente y trabaja a profundidad para que todo quede funcionalmente correcto y estéticamente profesional.
- No te inventes cosas innecesarias, sigue los lineamientos planteados.
- En el inicio no autenticado, en este landing page, debe haber un llamado a la acción con un mensaje de querer saber más detalles.
- Agrega un check que almacene cada que una persona hace click a los eventos/planes de los cards del landing page, para monitorear la actividad externa con la página, se debe hacer un cálculo de clicks mensuales y diarios, esta información debe verse en el apartado de estadísticas.

### Restricciones blandas

- Usar notificaciones de toolkit para toda notificación relevante
- No usar emojis sino iconos profesionales de alto nivel.
- Usar información motivadora, llamativa, profesional. usa un lenguaje amigable y cercano con el usuario en las páginas no autenticadas
- Usa estilos de diseño profesionales a partir de evaluaciones existentes de este estilo para ux writing en entornos similares.
- Interacción, involucra animaciones, transiciones llamativas y profesionales, overlays y estética de gran alcance. Hazlo además interactivo, operable y comprensible según las pautas de usabilidad.

---

## Estética

- Tipografía clara y legible, didáctica y llamativa.
- Paleta de colores del logo: #F23545, #6BBF54, #F2E313, #F27B35, #0D0D0D
- Has presente los colores de la paleta del logo en elementos visuales que compatibilice con el logo, pero no satures de estos colores la plataforma, para el resto usa el blanco para dar una sensación fresca de la plataforma y otros colores que quizás compatibilice también.
- Agregar elementos visuales profundamente llamativos para construir en el inicio no autenticado una Landing Page profesional.

---

# Contexto empresarial

### Filosofía y Propuesta de Valor

**Total Recreación** es una empresa consolidada en Santiago de Cali orientada a la creación de experiencias lúdicas memorables bajo la premisa de *"Diversión, creatividad y compromiso para tus eventos. Recreadores y servicios que inspiran sonrisas"*.

La compañía se diferencia drásticamente en el mercado gracias a un agresivo sello de confianza, el cual constituye su eslogan oficial:

> **"Garantía Total, si no te gusta no pagas."**
> 

Este respaldo demuestra un estándar de calidad absoluto y absoluta seguridad en la ejecución de su personal.

### Trayectoria y Liderazgo Institucional

- **Experiencia Corporativa:** Cuentan con un recorrido sólido de aproximadamente **15 años de historia en el mercado local**, posicionándose como una de las opciones más confiables para el entretenimiento familiar y corporativo en el Valle del Cauca.
- **Liderazgo de Alto Nivel:** La dirección general está encabezada por **Henry Calderón**, un referente en el sector que aporta un bagaje individual de **30 años de experiencia en el ecosistema de la recreación**, garantizando metodologías dinámicas probadas, manejo técnico de públicos y una estructura logística impecable.
- Además, hacen eventos tanto en campo abierto, conjuntos residenciales, eventos para niños, bebés, adultos, baby shower, matrimonios, etc. Incluso, dentro de su trayectoria reciente han dirigido a nivel nacional los eventos de Norma la empresa de útiles escolares que pertenece a la Organización Carvajal, haciendo actividades para impulsar y potenciar la familiarización, el contacto con el cliente final y crear recuerdos memorables para niños y niñas cuando van por sus útiles personales.

### Portafolio de Servicios y Formatos de Eventos

A través de sus ofertas gráficas oficiales, se evidencia una segmentación clara para cubrir cualquier tipo de festividad o necesidad recreativa:

1. **Fiestas Infantiles:** Espacios donde la imaginación cobra vida. Incluyen funciones profesionales de **títeres, globoflexia (globos)**, magos, dinámicas de alta energía, color y dinámicas diseñadas para hacer reír y soñar a los niños.
2. **Hora Loca:** Shows diseñados con "ritmo, luces y energía sin límites". Incorporan **efectos con máquinas de humo, luces rítmicas, música de baile cruzada, accesorios de cotillón (neón/temáticos)**, coreografías guiadas con giros y saltos para liberar tensiones y recargar el ambiente corporativo o social.
3. **Gymkanas (Gincanas):** Actividades de alta competencia que desafían el espíritu deportivo. Ideal para eventos empresariales (Team Building) o integraciones numerosas. Estructuran **circuitos de obstáculos, carreras de relevos, saltos en sacos** y retos enfocados en fortalecer el liderazgo, la coordinación y el trabajo en equipo.
4. **Pool Parties (Fiestas de Piscina):** Conceptos acuáticos equipados con **atracciones inflables, pistas enjabonadas deslizantes**, música en vivo y dinámicas de campo abierto coordinadas por recreadores especializados en seguridad acuática.
5. **Baby Showers:** Celebraciones enfocadas en la integración familiar con dinámicas tiernas pero sumamente divertidas, juegos personalizados para los futuros padres, shows lúdicos y globos.
6. **Eventos Estacionales y Corporativos:** Diseños a gran escala para fechas especiales como **Fiestas de Halloween** (con concursos de disfraces y juegos de misterio), **Tierna Navidad** (villancicos, ambientes de fantasía y entrega de regalos sorpresa con personajes navideños), y **Vacaciones Recreativas** enfocadas en propósitos específicos (talleres de arte, deportes guiados, manualidades y cine).

### Infraestructura Logística y Alimentos

Más allá de la animación humana, Total Recreación ofrece soporte integral para eventos, evitando que el cliente deba contratar múltiples proveedores:

- **Montajes de Audio:** Equipos profesionales de sonido y microfonía adaptados al aforo del evento.
- **Estaciones de Snacks y Comida de Feria:** Logística de alimentación interactiva ideal para eventos infantiles y masivos, proveyendo carritos de comidas rápidas que sirven:
    - Hamburguesas y perros calientes.
    - Algodones de azúcar de colores.
    - Crispetas (palomitas de maíz) recién hechas.

### Cultura Organizacional, Escuela y Operaciones Internas

- **Personal Altamente Capacitado:** La empresa cuenta con un staff numeroso de jóvenes recreadores formados internamente.
- **Talleres para Recreadores:** Funcionan activamente como una escuela lúdica, dictando capacitaciones y talleres técnicos de recreación para asegurar que su personal domine técnicas de expresión corporal, manejo de voz, globoflexia y dinámicas grupales.
- **Esquema Laboral y Ambiente:** Operan bajo un modelo dinámico de **pago por evento realizado**, ofreciendo flexibilidad económica a sus colaboradores. Internamente, se promueve un **ambiente de trabajo excepcional, muy agradable, lleno de risas, energía positiva y compañerismo**, lo cual se ve directamente reflejado en la frescura y carisma que los jóvenes proyectan durante las fiestas.

### Canales y Enlaces de Contacto Oficiales

- **Teléfono / Central de WhatsApp:** `+57 304 367 7885`
- **Instagram Oficial:** @totalrecreacion *(catálogo fotográfico e historias destacadas de montajes en vivo).*
- Facebook: https://www.facebook.com/TotalRecreacion
- **Sede Operativa:** Calle 14C # 36B-20, Santiago de Cali, Colombia (con cobertura logística regional).