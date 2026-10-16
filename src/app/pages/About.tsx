import { motion } from "motion/react";
import { Card, CardContent } from "../components/ui/card";
import { Badge } from "../components/ui/badge";
import { Button } from "../components/ui/button";
import { Award, Heart, Sparkles, ShieldCheck, Users, MessageCircle, Quote, MapPin, Calendar, Building2, Handshake, Star } from "lucide-react";
import { whatsappLink } from "../lib/helpers";

const gallery = [
  "https://images.unsplash.com/photo-1496337589254-7e19d01cec44?w=900&q=80",
  "https://images.unsplash.com/photo-1530103862676-de8c9debad1d?w=900&q=80",
  "https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?w=900&q=80",
  "https://images.unsplash.com/photo-1543872084-c7bd3822856f?w=900&q=80",
];

export function AboutPage() {
  return (
    <div>
      <section className="relative bg-[#0D0D0D] text-white overflow-hidden">
        <div className="absolute inset-0 opacity-30">
          <img src="https://images.unsplash.com/photo-1496337589254-7e19d01cec44?w=1600&q=80" alt="" className="w-full h-full object-cover" />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 py-24">
          <Badge className="bg-[#F2E313] text-[#0D0D0D] mb-3">Nuestra historia</Badge>
          <h1 className="text-4xl md:text-6xl font-bold max-w-3xl leading-tight">
            15 años creando <span className="text-[#F23545]">sonrisas auténticas</span> en el Valle del Cauca.
          </h1>
          <p className="mt-4 max-w-2xl text-white/85 text-lg">
            Una escuela de recreación que ha formado a decenas de jóvenes y ha acompañado más de mil eventos privados, corporativos y a nivel nacional.
          </p>
        </div>
      </section>

      {/* MAGAZINE */}
      <section className="max-w-7xl mx-auto px-4 py-16 grid lg:grid-cols-12 gap-8">
        <motion.div initial={{ opacity: 0, x: -10 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="lg:col-span-7 space-y-5">
          <h2 className="text-3xl font-bold">Una escuela de recreación, no solo una empresa</h2>
          <p className="text-muted-foreground leading-relaxed">
            Total Recreación nació en Santiago de Cali con la convicción de que la recreación profesional transforma comunidades. Bajo la dirección de
            <span className="text-foreground font-medium"> Henry Calderón</span> — referente con más de 30 años en el sector — la empresa funciona también como una <em>escuela lúdica</em>
            que dicta talleres de globoflexia, manejo de voz, expresión corporal y dinámicas grupales a jóvenes recreadores en formación.
          </p>
          <p className="text-muted-foreground leading-relaxed">
            Hemos dirigido a nivel nacional activaciones para <strong>Norma</strong> (Organización Carvajal), conjuntos residenciales, matrimonios, baby showers,
            fiestas infantiles y eventos corporativos. Nuestro sello: <strong style={{ color: "#F23545" }}>“Garantía Total: si no te gusta, no pagas”</strong>.
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
            {[
              { i: Award, n: "15+", l: "Años en el mercado" },
              { i: Users, n: "50+", l: "Recreadores formados" },
              { i: Star, n: "1k+", l: "Eventos realizados" },
              { i: ShieldCheck, n: "100%", l: "Garantía total" },
            ].map((s) => (
              <Card key={s.l} className="border-t-4" style={{ borderTopColor: "#F23545" }}>
                <CardContent className="p-4 text-center">
                  <s.i className="size-5 mx-auto text-[#F23545]" />
                  <div className="text-2xl font-bold mt-2">{s.n}</div>
                  <div className="text-xs text-muted-foreground">{s.l}</div>
                </CardContent>
              </Card>
            ))}
          </div>
        </motion.div>
        <motion.div initial={{ opacity: 0, x: 10 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="lg:col-span-5 grid grid-cols-2 gap-3">
          {gallery.map((g, i) => (
            <img key={g} src={g} alt={`Galería evento ${i + 1}`} className={`rounded-xl object-cover w-full ${i % 3 === 0 ? "row-span-2 h-full" : "h-40"}`} />
          ))}
        </motion.div>
      </section>

      {/* FILOSOFIA */}
      <section className="bg-[#FFFCEF] py-16">
        <div className="max-w-5xl mx-auto px-4 text-center">
          <Quote className="size-10 mx-auto text-[#F27B35]" />
          <blockquote className="text-2xl md:text-3xl font-medium mt-4 leading-snug">
            “Más que animar eventos, construimos recuerdos que la gente lleva consigo por años.”
          </blockquote>
          <div className="mt-4 text-sm text-muted-foreground">— Henry Calderón, Director General</div>
        </div>
      </section>

      {/* TRAYECTORIA Y ALCANCE */}
      <section className="max-w-7xl mx-auto px-4 py-16">
        <div className="mb-8">
          <Badge variant="outline" className="border-[#6BBF54] text-[#6BBF54]">Trayectoria y alcance</Badge>
          <h2 className="text-3xl font-bold mt-2">Confianza forjada en cada evento</h2>
          <p className="text-muted-foreground mt-2 max-w-3xl">
            Más de quince años acompañando a familias, conjuntos residenciales y marcas en Santiago de Cali, el Valle del Cauca y a nivel nacional.
            Construimos relaciones a largo plazo gracias a un servicio puntual, profesional y siempre con calidez humana.
          </p>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { i: Calendar, t: "15+ años de operación", d: "Una trayectoria continua desde 2010 atendiendo eventos sin interrupciones." },
            { i: MapPin, t: "Cobertura regional", d: "Cali, Jamundí, Yumbo, Palmira, Pance y municipios cercanos del Valle del Cauca." },
            { i: Building2, t: "Aliados corporativos", d: "Norma (Organización Carvajal), conjuntos residenciales, colegios y restaurantes." },
            { i: Handshake, t: "Garantía total", d: "Si la actividad no cumple expectativas, no la pagas. Un compromiso explícito con cada cliente." },
          ].map((f, i) => (
            <motion.div key={f.t} initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.06 }}>
              <Card className="h-full border-t-4" style={{ borderTopColor: "#6BBF54" }}>
                <CardContent className="p-5">
                  <f.i className="size-6 text-[#6BBF54]" />
                  <div className="font-semibold mt-3">{f.t}</div>
                  <p className="text-sm text-muted-foreground mt-1.5 leading-relaxed">{f.d}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </section>

      {/* JOIN US */}
      <section className="max-w-7xl mx-auto px-4 pb-20">
        <div className="rounded-3xl overflow-hidden relative bg-gradient-to-br from-[#6BBF54] via-[#0D9BD8] to-[#0D0D0D] text-white p-10 md:p-16">
          <div className="absolute inset-0 opacity-15">
            <img src="https://images.unsplash.com/photo-1543872084-c7bd3822856f?w=1600&q=80" alt="" className="w-full h-full object-cover" />
          </div>
          <div className="relative grid md:grid-cols-2 gap-8 items-center">
            <div>
              <Heart className="size-10 mb-3" />
              <h2 className="text-3xl md:text-4xl font-bold">Únete a nuestro equipo</h2>
              <p className="mt-3 text-white/90 max-w-xl">
                Buscamos jóvenes con energía, carisma y ganas de crecer. Pago por evento, formación interna gratuita y un ambiente lleno de risas.
              </p>
              <ul className="mt-4 grid grid-cols-2 gap-2 text-sm text-white/90 max-w-md">
                <li className="flex gap-2"><Sparkles className="size-4 text-[#F2E313]" /> Formación interna</li>
                <li className="flex gap-2"><Sparkles className="size-4 text-[#F2E313]" /> Pago por evento</li>
                <li className="flex gap-2"><Sparkles className="size-4 text-[#F2E313]" /> Horarios flexibles</li>
                <li className="flex gap-2"><Sparkles className="size-4 text-[#F2E313]" /> Equipo cercano</li>
              </ul>
            </div>
            <div className="md:justify-self-end">
              <Button asChild size="lg" className="bg-[#F2E313] text-[#0D0D0D] hover:bg-[#e6d710]">
                <a href={whatsappLink("Hola Total Recreación, me gustaría postularme para trabajar con ustedes.")} target="_blank" rel="noreferrer">
                  <MessageCircle className="size-4 mr-2" /> Quiero postularme
                </a>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
