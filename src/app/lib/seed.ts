import type {
  AdminUser, Category, Client, MaterialTemplate, Plan, Recreator, ScheduledEvent, Tag,
} from "./types";

export const seedTags: Tag[] = [
  { id: "t1", name: "Nuevo", color: "#6BBF54", description: "Recreador recién incorporado" },
  { id: "t2", name: "Aprendiz", color: "#F2E313", description: "En proceso de formación" },
  { id: "t3", name: "Bueno", color: "#F27B35", description: "Desempeño consistente" },
  { id: "t4", name: "Recreador", color: "#F23545", description: "Recreador titular" },
  { id: "t5", name: "Experto", color: "#0D0D0D", description: "Más de 5 años de experiencia" },
];

export const seedRecreadores: Recreator[] = [
  { id: "r1", fullName: "Heidy Duque", phone: "+57 301 555 0001", email: "heidy@totalrecreacion.co", joinDate: "2022-02-15", courses: ["Globoflexia", "Manejo de voz"], salary: 120000, tagId: "t4", active: true },
  { id: "r2", fullName: "Felipe Lago", phone: "+57 301 555 0002", joinDate: "2024-08-01", courses: ["Recreación infantil"], salary: 90000, tagId: "t2", active: true },
  { id: "r3", fullName: "Mariana Ríos", phone: "+57 301 555 0003", email: "mariana@totalrecreacion.co", joinDate: "2019-06-10", courses: ["Hora Loca", "Animación", "Expresión corporal"], salary: 160000, tagId: "t5", active: true },
  { id: "r4", fullName: "Andrés Patiño", phone: "+57 301 555 0004", joinDate: "2023-04-20", courses: ["Dinámicas grupales"], salary: 110000, tagId: "t3", active: true },
  { id: "r5", fullName: "Camila Restrepo", phone: "+57 302 700 1122", email: "camila@totalrecreacion.co", joinDate: "2021-09-12", courses: ["Pinta caritas", "Coreografías", "Animación"], salary: 130000, tagId: "t4", active: true },
  { id: "r6", fullName: "Juan Pablo Méndez", phone: "+57 318 415 8841", joinDate: "2025-01-15", courses: ["Recreación infantil"], salary: 85000, tagId: "t1", active: true },
  { id: "r7", fullName: "Sara Ocampo", phone: "+57 314 002 9881", joinDate: "2017-04-03", courses: ["Magia escénica", "Manejo de voz", "Seguridad acuática"], salary: 180000, tagId: "t5", active: true },
  { id: "r8", fullName: "Diego Caicedo", phone: "+57 322 105 4477", joinDate: "2020-11-22", courses: ["Coordinación general", "Sonido profesional"], salary: 170000, tagId: "t5", active: true },
  { id: "r9", fullName: "Valentina Salazar", phone: "+57 315 880 6612", joinDate: "2023-07-05", courses: ["Globoflexia avanzada"], salary: 115000, tagId: "t3", active: true },
  { id: "r10", fullName: "Nicolás Gómez", phone: "+57 320 661 9090", joinDate: "2024-02-19", courses: ["Dinámicas adolescentes"], salary: 95000, tagId: "t2", active: false },
  { id: "r11", fullName: "Laura Hidalgo", phone: "+57 304 992 1010", joinDate: "2022-10-08", courses: ["Animación corporativa"], salary: 125000, tagId: "t4", active: true },
  { id: "r12", fullName: "Esteban Torres", phone: "+57 313 882 7755", joinDate: "2018-03-30", courses: ["Hora Loca", "Sonido"], salary: 165000, tagId: "t5", active: false },
];

export const seedClients: Client[] = [
  { id: "c1", name: "Viviana Bernal", phone: "+57 304 111 2233", municipality: "Cali", email: "vivi@email.com", description: "Fan de fiestas de piscina, prefiere animación temática." },
  { id: "c2", name: "Conjunto Alameda del Río", phone: "+57 312 444 5566", municipality: "Cali", address: "Cra 12 #45-67", description: "Eventos para niños del conjunto los sábados." },
  { id: "c3", name: "Norma S.A.", phone: "+57 300 999 8877", municipality: "Cali", email: "eventos@norma.com.co", description: "Cliente corporativo, eventos escolares a nivel nacional." },
  { id: "c4", name: "Familia Ortiz Vélez", phone: "+57 318 220 4499", municipality: "Jamundí", description: "Cumpleaños infantiles trimestrales para tres niños." },
  { id: "c5", name: "Colegio San Francisco", phone: "3104441122", municipality: "Cali", email: "rectoria@sanfrancisco.edu.co", description: "Actividades de cierre de año y bienvenida escolar." },
  { id: "c6", name: "Inversiones Vértice", phone: "+57 301 998 7766", municipality: "Yumbo", email: "rh@vertice.co", description: "Team building corporativo trimestral para 80 colaboradores." },
  { id: "c7", name: "Andrea Mosquera", phone: "3217788441", municipality: "Palmira", description: "Baby showers y eventos familiares íntimos." },
  { id: "c8", name: "Conjunto Torres del Prado", phone: "+57 302 654 3210", municipality: "Cali", address: "Av 6N #28-19", description: "Solicita eventos para niños tres veces al año." },
  { id: "c9", name: "Fundación Crecer", phone: "+57 315 003 9988", municipality: "Cali", email: "voluntariado@crecer.org", description: "ONG infantil, eventos sociales con descuento solidario." },
  { id: "c10", name: "Restaurante La Hacienda", phone: "+57 313 220 1199", municipality: "Pance", description: "Activaciones en su zona de eventos al aire libre." },
];

export const seedCategories: Category[] = [
  { id: "cat1", name: "Fiestas Infantiles", description: "Magia, globoflexia y mucha energía para los más pequeños.", icon: "PartyPopper", color: "#F23545" },
  { id: "cat2", name: "Hora Loca", description: "Ritmo, luces y energía sin límites.", icon: "Sparkles", color: "#F27B35" },
  { id: "cat3", name: "Gymkanas", description: "Retos de team building y deporte.", icon: "Trophy", color: "#6BBF54" },
  { id: "cat4", name: "Pool Parties", description: "Inflables, pistas enjabonadas y diversión acuática.", icon: "Waves", color: "#0D9BD8" },
  { id: "cat5", name: "Comida & Snacks", description: "Estaciones de comida de feria para tu evento.", icon: "IceCream", color: "#F2E313" },
  { id: "cat6", name: "Sonido & Efectos", description: "Equipos de audio, máquinas de humo y luces.", icon: "Speaker", color: "#0D0D0D" },
];

const POOL_IMG = "https://res.cloudinary.com/dnqqrvw3s/image/upload/v1780190297/Pool_Party_xcqpyn.png";
const GYMKANA_IMG = "https://res.cloudinary.com/dnqqrvw3s/image/upload/v1780190389/gymkana_g5fltv.png";

export const seedPlans: Plan[] = [
  // Fiestas infantiles (cat1)
  {
    id: "p1", categoryId: "cat1", name: "Fiesta Infantil Mágica", basePrice: 480000,
    extras: [{ id: "e1", amount: 180000, reason: "Show de magia profesional" }],
    description: "3 horas de pura diversión con animadores, globoflexia y dinámicas temáticas para niños de 3 a 10 años.",
    audience: "Niños 3-10 años",
    whatsappMessage: "Hola Total Recreación, quiero más información sobre el plan Fiesta Infantil Mágica.",
    includes: [
      { id: "i1", label: "2 animadores especializados" },
      { id: "i2", label: "Globoflexia y entrega de figuras" },
      { id: "i3", label: "Pinta caritas" },
      { id: "i4", label: "Hora loca temática" },
    ],
  },
  {
    id: "p7", categoryId: "cat1", name: "Cumpleaños Express", basePrice: 320000,
    extras: [{ id: "e7", amount: 90000, reason: "Decoración con globos" }],
    description: "2 horas de animación, juegos y dinámicas ideales para celebraciones íntimas.",
    audience: "Niños 4-9 años",
    whatsappMessage: "Hola Total Recreación, me interesa el plan Cumpleaños Express.",
    includes: [
      { id: "ix1", label: "1 animador certificado" },
      { id: "ix2", label: "Globoflexia básica" },
      { id: "ix3", label: "Pista de baile guiada" },
    ],
  },
  {
    id: "p8", categoryId: "cat1", name: "Show de Títeres", basePrice: 290000, extras: [],
    description: "Función itinerante de títeres con personajes originales y narrativa interactiva.",
    audience: "Niños 3-8 años",
    whatsappMessage: "Hola Total Recreación, me gustaría cotizar el Show de Títeres.",
    includes: [
      { id: "ix4", label: "Función de 45 min" },
      { id: "ix5", label: "Set de personajes" },
      { id: "ix6", label: "Sonido portátil" },
    ],
  },
  // Hora Loca (cat2)
  {
    id: "p2", categoryId: "cat2", name: "Hora Loca Premium", basePrice: 350000,
    extras: [{ id: "e2", amount: 250000, reason: "Máquina de humo y luces" }],
    description: "Show de 60 minutos con luces rítmicas, accesorios neón y coreografías guiadas.",
    audience: "Adultos y corporativos",
    whatsappMessage: "Hola Total Recreación, deseo conocer más sobre la Hora Loca Premium.",
    includes: [
      { id: "i5", label: "Accesorios neón / cotillón" },
      { id: "i6", label: "Animadores con micrófono" },
      { id: "i7", label: "Música mezclada en vivo" },
    ],
  },
  {
    id: "p9", categoryId: "cat2", name: "Hora Loca Carnaval", basePrice: 420000,
    extras: [{ id: "e9", amount: 200000, reason: "Banda en vivo" }],
    description: "Comparsa estilo carnaval de Barranquilla con disfraces, percusión y baile en vivo.",
    audience: "Todo público",
    whatsappMessage: "Hola Total Recreación, quiero conocer la Hora Loca Carnaval.",
    includes: [
      { id: "ix7", label: "4 bailarines disfrazados" },
      { id: "ix8", label: "Percusión en vivo" },
      { id: "ix9", label: "Coreografías guiadas" },
    ],
  },
  // Gymkanas (cat3)
  {
    id: "p3", categoryId: "cat3", name: "Gymkana Empresarial", basePrice: 720000, extras: [],
    description: "Circuito de retos colaborativos pensados para fortalecer liderazgo y trabajo en equipo.",
    audience: "Empresas / Team building",
    whatsappMessage: "Hola Total Recreación, quiero cotizar una Gymkana Empresarial.",
    image: GYMKANA_IMG,
    includes: [
      { id: "i8", label: "Circuito de obstáculos" },
      { id: "i9", label: "Carrera de relevos" },
      { id: "i10", label: "Saltos en sacos" },
      { id: "i11", label: "Premiación final" },
    ],
  },
  {
    id: "p10", categoryId: "cat3", name: "Gymkana Familiar", basePrice: 480000, extras: [{ id: "e10", amount: 120000, reason: "Premios temáticos" }],
    description: "Versión familiar de la gymkana con retos accesibles para todas las edades.",
    audience: "Familias",
    whatsappMessage: "Hola Total Recreación, me gustaría cotizar la Gymkana Familiar.",
    image: GYMKANA_IMG,
    includes: [
      { id: "ix10", label: "Retos por equipos" },
      { id: "ix11", label: "Materiales deportivos" },
      { id: "ix12", label: "Trofeo simbólico" },
    ],
  },
  {
    id: "p11", categoryId: "cat3", name: "Olimpiadas Escolares", basePrice: 950000, extras: [],
    description: "Jornada deportiva para colegios con módulos de competencia y mesa de jueces.",
    audience: "Colegios",
    whatsappMessage: "Hola Total Recreación, quiero información de las Olimpiadas Escolares.",
    image: GYMKANA_IMG,
    includes: [
      { id: "ix13", label: "6 módulos deportivos" },
      { id: "ix14", label: "Coordinación general" },
      { id: "ix15", label: "Medallería" },
    ],
  },
  // Pool Parties (cat4)
  {
    id: "p4", categoryId: "cat4", name: "Pool Party Splash", basePrice: 900000,
    extras: [{ id: "e3", amount: 300000, reason: "Pista enjabonada" }],
    description: "Inflables, dinámicas acuáticas y animación especializada en seguridad.",
    audience: "Niños y familias",
    whatsappMessage: "Hola Total Recreación, me interesa la Pool Party Splash.",
    image: POOL_IMG,
    includes: [
      { id: "i12", label: "Inflables acuáticos" },
      { id: "i13", label: "Animadores certificados" },
      { id: "i14", label: "Música y micrófono" },
    ],
  },
  {
    id: "p12", categoryId: "cat4", name: "Pool Party Tropical", basePrice: 1200000,
    extras: [{ id: "e12", amount: 350000, reason: "Bartender showman" }],
    description: "Concepto playero con barra de mocktails, decoración tropical y DJ.",
    audience: "Adultos jóvenes",
    whatsappMessage: "Hola Total Recreación, quiero más info sobre la Pool Party Tropical.",
    image: POOL_IMG,
    includes: [
      { id: "ix16", label: "DJ profesional" },
      { id: "ix17", label: "Mocktails ilimitados (60 pax)" },
      { id: "ix18", label: "Decoración tropical" },
    ],
  },
  {
    id: "p13", categoryId: "cat4", name: "Pool Kids Fest", basePrice: 780000, extras: [],
    description: "Versión kids con juegos guiados y monitores certificados en primeros auxilios.",
    audience: "Niños 5-12 años",
    whatsappMessage: "Hola Total Recreación, me interesa la Pool Kids Fest.",
    image: POOL_IMG,
    includes: [
      { id: "ix19", label: "3 monitores RCP" },
      { id: "ix20", label: "Juegos con flotadores" },
      { id: "ix21", label: "Animación temática" },
    ],
  },
  // Comida (cat5)
  {
    id: "p5", categoryId: "cat5", name: "Estación Carrito Feria", basePrice: 380000,
    extras: [{ id: "e4", amount: 80000, reason: "Operador adicional" }],
    description: "Carrito de hamburguesas, perros calientes, algodones y crispetas para 60 personas.",
    audience: "Eventos masivos",
    whatsappMessage: "Hola Total Recreación, quiero cotizar el carrito de comida feria.",
    includes: [
      { id: "i15", label: "Hamburguesas y perros" },
      { id: "i16", label: "Algodones de azúcar" },
      { id: "i17", label: "Crispetas recién hechas" },
    ],
  },
  {
    id: "p14", categoryId: "cat5", name: "Estación de Snacks Dulces", basePrice: 290000, extras: [],
    description: "Mesa de algodones, manzanas acarameladas y crispetas con dispensadores.",
    audience: "Eventos infantiles",
    whatsappMessage: "Hola Total Recreación, me interesa la Estación de Snacks Dulces.",
    includes: [
      { id: "ix22", label: "Algodones de azúcar" },
      { id: "ix23", label: "Manzanas acarameladas" },
      { id: "ix24", label: "Crispetas" },
    ],
  },
  {
    id: "p15", categoryId: "cat5", name: "Combo Almuerzo Express", basePrice: 540000, extras: [{ id: "e15", amount: 120000, reason: "Servicio meseros" }],
    description: "Almuerzos personales empacados con bebida para 50 personas.",
    audience: "Corporativos",
    whatsappMessage: "Hola Total Recreación, quiero información del Combo Almuerzo Express.",
    includes: [
      { id: "ix25", label: "Almuerzo + bebida" },
      { id: "ix26", label: "Entrega organizada" },
    ],
  },
  // Sonido (cat6)
  {
    id: "p6", categoryId: "cat6", name: "Pack Sonido Profesional", basePrice: 260000,
    extras: [{ id: "e5", amount: 120000, reason: "Máquina de humo" }],
    description: "Equipo de sonido para aforos de hasta 200 personas con micrófonos inalámbricos.",
    audience: "Cualquier evento",
    whatsappMessage: "Hola Total Recreación, me gustaría cotizar el Pack Sonido Profesional.",
    includes: [
      { id: "i18", label: "2 cabinas amplificadas" },
      { id: "i19", label: "Mezclador" },
      { id: "i20", label: "Micrófonos inalámbricos" },
    ],
  },
  {
    id: "p16", categoryId: "cat6", name: "Pack Luces y Efectos", basePrice: 340000, extras: [{ id: "e16", amount: 150000, reason: "Operador técnico" }],
    description: "Pack de luces robóticas, par leds y máquina de humo.",
    audience: "Hora Loca y fiestas",
    whatsappMessage: "Hola Total Recreación, quiero el Pack Luces y Efectos.",
    includes: [
      { id: "ix27", label: "4 par leds RGB" },
      { id: "ix28", label: "2 cabezas móviles" },
      { id: "ix29", label: "Máquina de humo" },
    ],
  },
  {
    id: "p17", categoryId: "cat6", name: "DJ Profesional", basePrice: 600000, extras: [],
    description: "DJ con set personalizado y equipos incluidos para 4 horas.",
    audience: "Todo público",
    whatsappMessage: "Hola Total Recreación, quiero cotizar el plan DJ Profesional.",
    includes: [
      { id: "ix30", label: "DJ + controlador" },
      { id: "ix31", label: "Cabinas y luces" },
      { id: "ix32", label: "Solicitud de canciones" },
    ],
  },
];

export const seedMaterials: MaterialTemplate[] = [
  {
    id: "m1", name: "Evento Marca Norma", description: "Activación corporativa para útiles escolares.",
    items: [
      { id: "mi1", label: "Pinta caritas (12 colores)" },
      { id: "mi2", label: "Pinceles" },
      { id: "mi3", label: "Material corporativo" },
      { id: "mi4", label: "Infladores" },
      { id: "mi5", label: "Globos de colores" },
    ],
  },
  {
    id: "m2", name: "Evento Piscina", description: "Material base para pool party.",
    items: [
      { id: "mi6", label: "Pista enjabonada" },
      { id: "mi7", label: "Globos" },
      { id: "mi8", label: "Inflador eléctrico" },
      { id: "mi9", label: "Silbatos" },
    ],
  },
  {
    id: "m3", name: "Cumpleaños Infantil", description: "Plantilla típica para fiestas en casa.",
    items: [
      { id: "mi10", label: "Bolsa de globos #9" },
      { id: "mi11", label: "Pintura facial" },
      { id: "mi12", label: "Premios sorpresa" },
      { id: "mi13", label: "Cinta para juegos" },
    ],
  },
  {
    id: "m4", name: "Hora Loca corporativa", description: "Cotillón y accesorios para empresas.",
    items: [
      { id: "mi14", label: "Pelucas de colores" },
      { id: "mi15", label: "Lentes neón" },
      { id: "mi16", label: "Pulseras LED" },
      { id: "mi17", label: "Pitos y matracas" },
    ],
  },
];

const today = new Date();
const iso = (offsetDays: number) => {
  const d = new Date(today);
  d.setDate(d.getDate() + offsetDays);
  return d.toISOString().slice(0, 10);
};
const isoMonth = (monthOffset: number, day: number) => {
  const d = new Date(today.getFullYear(), today.getMonth() + monthOffset, day);
  return d.toISOString().slice(0, 10);
};

export const seedEvents: ScheduledEvent[] = [
  // Upcoming
  { id: "ev1", title: "Día de Piscina Familiar", description: "Jornada recreativa en la piscina del conjunto.", address: "Conjunto Alameda del Río, Cra 12 #45-67, Cali",
    contactPhone: "+57 312 444 5566", date: iso(2), startTime: "10:00", endTime: "16:00",
    planId: "p4", selectedExtraId: "e3", clientId: "c2", recreatorIds: ["r1", "r2"],
    checklist: [], transportCost: 80000, materialCost: 60000, rating: null, ratingComment: "",
    createdAt: new Date().toISOString() },
  { id: "ev2", title: "Hora Loca Aniversario Norma", description: "Activación de cierre del lanzamiento escolar.", address: "Centro de Eventos Valle del Pacífico, Cali",
    contactPhone: "+57 300 999 8877", date: iso(5), startTime: "19:00", endTime: "21:00",
    planId: "p2", selectedExtraId: "e2", clientId: "c3", recreatorIds: ["r3"],
    checklist: [], transportCost: 120000, materialCost: 40000, rating: null, ratingComment: "",
    createdAt: new Date().toISOString() },
  { id: "ev5", title: "Cumpleaños Mateo", description: "Cumpleaños temático superhéroes.", address: "Jamundí, Conjunto Solaria casa 12",
    contactPhone: "+57 318 220 4499", date: iso(8), startTime: "14:00", endTime: "17:00",
    planId: "p1", selectedExtraId: null, clientId: "c4", recreatorIds: ["r5", "r6"],
    checklist: [], transportCost: 60000, materialCost: 40000, rating: null, ratingComment: "",
    createdAt: new Date().toISOString() },
  { id: "ev6", title: "Bienvenida Colegio San Francisco", description: "Jornada lúdica primer día de clases.", address: "Cali, Sede principal",
    contactPhone: "+57 310 444 1122", date: iso(12), startTime: "08:00", endTime: "12:00",
    planId: "p11", selectedExtraId: null, clientId: "c5", recreatorIds: ["r7", "r8", "r5"],
    checklist: [], transportCost: 150000, materialCost: 100000, rating: null, ratingComment: "",
    createdAt: new Date().toISOString() },
  // Past — distribute through the year for stats
  { id: "ev3", title: "Fiesta Infantil Catalina", description: "Cumpleaños temático princesas.", address: "Calle 9 #30-15, Cali",
    contactPhone: "+57 304 111 2233", date: iso(-10), startTime: "15:00", endTime: "18:00",
    planId: "p1", selectedExtraId: null, clientId: "c1", recreatorIds: ["r1", "r4"],
    checklist: [], transportCost: 40000, materialCost: 30000, rating: 5, ratingComment: "¡Excelente, todos los niños felices!",
    createdAt: new Date(Date.now() - 86400000 * 12).toISOString() },
  { id: "ev4", title: "Gymkana Empresa ACME", description: "Team building área comercial.", address: "Finca Hotel Las Mercedes, Pance",
    contactPhone: "+57 305 222 1111", date: iso(-30), startTime: "09:00", endTime: "13:00",
    planId: "p3", selectedExtraId: null, clientId: "c3", recreatorIds: ["r3", "r4"],
    checklist: [], transportCost: 200000, materialCost: 80000, rating: 4, ratingComment: "Muy buena energía del equipo.",
    createdAt: new Date(Date.now() - 86400000 * 35).toISOString() },
  { id: "ev7", title: "Pool Party Cumple 30 Andrea", description: "Cumpleaños número 30 estilo pool tropical.", address: "Pance, Cali",
    contactPhone: "+57 321 778 8441", date: isoMonth(-1, 14), startTime: "15:00", endTime: "20:00",
    planId: "p12", selectedExtraId: "e12", clientId: "c7", recreatorIds: ["r7", "r11"],
    checklist: [], transportCost: 90000, materialCost: 70000, rating: 5, ratingComment: "Increíble experiencia.",
    createdAt: new Date(Date.now() - 86400000 * 35).toISOString() },
  { id: "ev8", title: "Hora Loca Carnaval Empresa Vértice", description: "Cierre de año empresa.", address: "Yumbo, sede empresarial",
    contactPhone: "+57 301 998 7766", date: isoMonth(-2, 10), startTime: "19:00", endTime: "22:00",
    planId: "p9", selectedExtraId: null, clientId: "c6", recreatorIds: ["r3", "r5", "r11"],
    checklist: [], transportCost: 180000, materialCost: 90000, rating: 5, ratingComment: "Volveremos a contratar.",
    createdAt: new Date(Date.now() - 86400000 * 65).toISOString() },
  { id: "ev9", title: "Activación Torres del Prado", description: "Día del niño del conjunto.", address: "Av 6N #28-19, Cali",
    contactPhone: "+57 302 654 3210", date: isoMonth(-3, 23), startTime: "10:00", endTime: "13:00",
    planId: "p7", selectedExtraId: "e7", clientId: "c8", recreatorIds: ["r2", "r9"],
    checklist: [], transportCost: 50000, materialCost: 35000, rating: 4, ratingComment: "Niños felices.",
    createdAt: new Date().toISOString() },
  { id: "ev10", title: "Almuerzo Empresarial Vértice", description: "Capacitación con almuerzo.", address: "Yumbo, sala A",
    contactPhone: "+57 301 998 7766", date: isoMonth(-4, 5), startTime: "12:00", endTime: "14:00",
    planId: "p15", selectedExtraId: "e15", clientId: "c6", recreatorIds: ["r8"],
    checklist: [], transportCost: 80000, materialCost: 0, rating: 4, ratingComment: "Cumplió expectativas.",
    createdAt: new Date().toISOString() },
  { id: "ev11", title: "Show de Títeres Crecer", description: "Evento social.", address: "Cali, sede Fundación",
    contactPhone: "+57 315 003 9988", date: isoMonth(-5, 18), startTime: "10:00", endTime: "12:00",
    planId: "p8", selectedExtraId: null, clientId: "c9", recreatorIds: ["r6"],
    checklist: [], transportCost: 40000, materialCost: 20000, rating: 5, ratingComment: "Gracias por el apoyo.",
    createdAt: new Date().toISOString() },
  { id: "ev12", title: "Pool Kids Fest La Hacienda", description: "Pool party para los hijos del personal.", address: "Restaurante La Hacienda, Pance",
    contactPhone: "+57 313 220 1199", date: isoMonth(-6, 2), startTime: "11:00", endTime: "15:00",
    planId: "p13", selectedExtraId: null, clientId: "c10", recreatorIds: ["r7", "r9", "r11"],
    checklist: [], transportCost: 110000, materialCost: 80000, rating: 4, ratingComment: "Buenas reseñas.",
    createdAt: new Date().toISOString() },
  { id: "ev13", title: "Cumple Familia Ortiz", description: "Cumple Sebastián.", address: "Jamundí",
    contactPhone: "+57 318 220 4499", date: isoMonth(-7, 22), startTime: "14:00", endTime: "17:00",
    planId: "p7", selectedExtraId: null, clientId: "c4", recreatorIds: ["r2"],
    checklist: [], transportCost: 50000, materialCost: 25000, rating: 5, ratingComment: "Excelente animador.",
    createdAt: new Date().toISOString() },
  { id: "ev14", title: "Olimpiadas Internas Vértice", description: "Team building deportivo.", address: "Yumbo Centro Empresarial",
    contactPhone: "+57 301 998 7766", date: isoMonth(-8, 14), startTime: "08:00", endTime: "13:00",
    planId: "p3", selectedExtraId: null, clientId: "c6", recreatorIds: ["r3", "r8", "r11"],
    checklist: [], transportCost: 200000, materialCost: 120000, rating: 5, ratingComment: "Mucha energía.",
    createdAt: new Date().toISOString() },
  { id: "ev15", title: "Hora Loca Boda Bernal", description: "Cierre de fiesta.", address: "Hotel Spiwak, Cali",
    contactPhone: "+57 304 111 2233", date: isoMonth(-9, 9), startTime: "23:00", endTime: "00:30",
    planId: "p2", selectedExtraId: "e2", clientId: "c1", recreatorIds: ["r3", "r5"],
    checklist: [], transportCost: 90000, materialCost: 40000, rating: 5, ratingComment: "Inolvidable.",
    createdAt: new Date().toISOString() },
  { id: "ev16", title: "Carrito Feria Conjunto Alameda", description: "Día del vecino.", address: "Cra 12 #45-67, Cali",
    contactPhone: "+57 312 444 5566", date: isoMonth(-10, 17), startTime: "16:00", endTime: "20:00",
    planId: "p5", selectedExtraId: "e4", clientId: "c2", recreatorIds: ["r11", "r9"],
    checklist: [], transportCost: 70000, materialCost: 30000, rating: 4, ratingComment: "Repetir el otro año.",
    createdAt: new Date().toISOString() },
  { id: "ev17", title: "DJ Cumple Andrea", description: "Cumple 31.", address: "Palmira",
    contactPhone: "+57 321 778 8441", date: isoMonth(-11, 3), startTime: "20:00", endTime: "00:00",
    planId: "p17", selectedExtraId: null, clientId: "c7", recreatorIds: ["r8"],
    checklist: [], transportCost: 100000, materialCost: 0, rating: 5, ratingComment: "Súper buen DJ.",
    createdAt: new Date().toISOString() },
  { id: "ev18", title: "Snacks Crecer", description: "Bingo social.", address: "Cali",
    contactPhone: "+57 315 003 9988", date: isoMonth(-2, 25), startTime: "15:00", endTime: "18:00",
    planId: "p14", selectedExtraId: null, clientId: "c9", recreatorIds: ["r2"],
    checklist: [], transportCost: 30000, materialCost: 15000, rating: 4, ratingComment: "Muy bueno.",
    createdAt: new Date().toISOString() },
];

export const seedAdmin: AdminUser = {
  id: "u1", name: "Henry Calderón", email: "admin@totalrecreacion.co", password: "admin123",
};
