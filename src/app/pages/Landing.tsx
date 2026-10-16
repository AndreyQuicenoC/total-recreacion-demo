import { useMemo } from "react";
import { motion } from "motion/react";
import { useApp } from "../lib/store";
import { BRAND, fmtCOP, whatsappLink } from "../lib/helpers";
import { Button } from "../components/ui/button";
import { Card, CardContent } from "../components/ui/card";
import { Badge } from "../components/ui/badge";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "../components/ui/carousel";
import {
  ArrowRight, CheckCircle2, Sparkles, Phone, ShieldCheck, Star, Award, Users, MessageCircle, PartyPopper,
} from "lucide-react";
import type { Plan, Category } from "../lib/types";
import { Link } from "react-router";
import { ImageWithFallback } from "../components/figma/ImageWithFallback";

const heroImg = "https://images.unsplash.com/photo-1530103862676-de8c9debad1d?w=1600&q=80&auto=format&fit=crop";

export function LandingPage() {
  const { categories, plans, trackClick } = useApp();

  const byCategory = useMemo(() => {
    const map = new Map<string, Plan[]>();
    plans.forEach((p) => {
      const arr = map.get(p.categoryId) ?? [];
      arr.push(p); map.set(p.categoryId, arr);
    });
    return categories.map((c) => ({ category: c, plans: map.get(c.id) ?? [] })).filter((x) => x.plans.length > 0);
  }, [categories, plans]);

  return (
    <div>
      {/* HERO */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0">
          <img src={heroImg} alt="" aria-hidden="true" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-br from-[#0D0D0D]/90 via-[#0D0D0D]/70 to-[#F23545]/60" />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 py-24 md:py-32 text-white">
          <motion.div initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <Badge className="bg-[#F2E313] text-[#0D0D0D] hover:bg-[#F2E313] mb-4">
              <ShieldCheck className="size-3.5 mr-1" /> Garantía Total · Si no te gusta no pagas
            </Badge>
            <h1 className="text-4xl md:text-6xl font-bold leading-tight max-w-3xl">
              Diversión, creatividad y compromiso para <span className="text-[#F2E313]">tus eventos</span>.
            </h1>
            <p className="mt-5 text-lg max-w-2xl text-white/85">
              Recreadores y servicios que inspiran sonrisas. 15 años creando experiencias lúdicas memorables en Santiago de Cali y el Valle del Cauca.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button asChild size="lg" className="bg-[#F23545] hover:bg-[#d92a39] shadow-xl">
                <a href={whatsappLink("Hola Total Recreación, quiero más información sobre sus servicios.")} target="_blank" rel="noreferrer">
                  <MessageCircle className="size-4 mr-2" /> Quiero saber más detalles
                </a>
              </Button>
              <Button asChild size="lg" variant="outline" className="bg-white/10 backdrop-blur text-white border-white/30 hover:bg-white/20">
                <a href="#planes"><ArrowRight className="size-4 mr-2" /> Ver planes</a>
              </Button>
            </div>
            <div className="mt-10 flex flex-wrap gap-x-8 gap-y-3 text-sm text-white/80">
              <span className="flex items-center gap-2"><Award className="size-4 text-[#F2E313]" /> 15 años de trayectoria</span>
              <span className="flex items-center gap-2"><Users className="size-4 text-[#6BBF54]" /> Más de 50 recreadores formados</span>
              <span className="flex items-center gap-2"><Star className="size-4 text-[#F27B35]" /> +1.000 eventos realizados</span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* VALOR */}
      <section className="max-w-7xl mx-auto px-4 py-16 grid md:grid-cols-3 gap-5">
        {[
          { c: BRAND.red, i: Sparkles, t: "Experiencias memorables", d: "Diseñamos cada actividad para conectar emocionalmente con tu público." },
          { c: BRAND.green, i: ShieldCheck, t: "Garantía total", d: "Si la actividad no cumple tus expectativas, no la pagas. Así de simple." },
          { c: BRAND.orange, i: Users, t: "Equipo profesional", d: "Recreadores formados internamente con metodologías probadas." },
        ].map((v, i) => (
          <motion.div key={v.t} initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}>
            <Card className="border-2 border-transparent hover:border-[#F2E313] transition h-full">
              <CardContent className="p-6">
                <div className="size-12 rounded-xl grid place-items-center mb-4" style={{ background: v.c }}>
                  <v.i className="size-6 text-white" />
                </div>
                <h3 className="font-semibold">{v.t}</h3>
                <p className="text-sm text-muted-foreground mt-1">{v.d}</p>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </section>

      {/* CARRUSELES POR CATEGORÍA */}
      <section id="planes" className="bg-gradient-to-b from-[#FFFCEF] to-white py-16">
        <div className="max-w-7xl mx-auto px-4">
          <div className="mb-8 text-center">
            <Badge variant="outline" className="border-[#F23545] text-[#F23545]">Catálogo</Badge>
            <h2 className="text-3xl md:text-4xl font-bold mt-3">Encuentra el plan perfecto para tu evento</h2>
            <p className="text-muted-foreground mt-2 max-w-2xl mx-auto">Cada categoría está diseñada por nuestro equipo experto en recreación.</p>
          </div>

          <div className="space-y-12">
            {byCategory.map(({ category, plans }) => (
              <CategoryRow key={category.id} category={category} plans={plans} onClick={trackClick} />
            ))}
          </div>
        </div>
      </section>

      {/* CTA FINAL */}
      <section className="max-w-7xl mx-auto px-4 py-20">
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#F23545] via-[#F27B35] to-[#F2E313] p-10 md:p-16 text-white shadow-2xl">
          <div className="absolute -right-12 -top-12 size-64 rounded-full bg-white/10" />
          <div className="absolute -left-16 -bottom-20 size-72 rounded-full bg-white/10" />
          <div className="relative grid md:grid-cols-2 gap-8 items-center">
            <div>
              <PartyPopper className="size-10 mb-3" />
              <h2 className="text-3xl md:text-4xl font-bold">¿Tienes un evento en mente?</h2>
              <p className="mt-3 text-white/90 max-w-xl">Cuéntanos qué imaginas y nosotros diseñamos una experiencia inolvidable. Cotización gratis sin compromiso.</p>
            </div>
            <div className="flex flex-wrap gap-3 md:justify-end">
              <Button asChild size="lg" className="bg-white text-[#F23545] hover:bg-white/90">
                <a href={whatsappLink("Hola, me gustaría cotizar un evento con Total Recreación.")} target="_blank" rel="noreferrer">
                  <Phone className="size-4 mr-2" /> Hablemos por WhatsApp
                </a>
              </Button>
              <Button asChild size="lg" variant="outline" className="bg-transparent border-white text-white hover:bg-white/10">
                <Link to="/sobre-nosotros">Conoce al equipo <ArrowRight className="size-4 ml-2" /></Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

function CategoryRow({ category, plans, onClick }: { category: Category; plans: Plan[]; onClick: (id: string) => void }) {
  return (
    <div>
      <div className="flex items-end justify-between mb-4">
        <div>
          <h3 className="text-2xl font-bold flex items-center gap-2">
            <span className="size-2.5 rounded-full" style={{ background: category.color ?? BRAND.red }} />
            {category.name}
          </h3>
          {category.description && <p className="text-sm text-muted-foreground mt-1 max-w-2xl">{category.description}</p>}
        </div>
        <Badge variant="secondary">{plans.length} planes</Badge>
      </div>
      <Carousel opts={{ align: "start" }} className="w-full">
        <CarouselContent>
          {plans.map((p) => (
            <CarouselItem key={p.id} className="basis-full sm:basis-1/2 lg:basis-1/3">
              <PlanCard plan={p} onClick={onClick} />
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="hidden sm:flex" />
        <CarouselNext className="hidden sm:flex" />
      </Carousel>
    </div>
  );
}

function PlanCard({ plan, onClick }: { plan: Plan; onClick: (id: string) => void }) {
  const handle = () => onClick(plan.id);
  return (
    <motion.div whileHover={{ y: -4 }} transition={{ duration: 0.2 }}>
      <Card className="overflow-hidden h-full flex flex-col group">
        <div className="relative" style={{ height: 140 }}>
          {plan.image ? (
            <ImageWithFallback src={plan.image} alt={plan.name} className="w-full h-full object-cover" />
          ) : (
            <div className="w-full h-full bg-gradient-to-br from-[#F23545]/80 via-[#F27B35]/70 to-[#F2E313]/80 grid place-items-center">
              <PartyPopper className="size-10 text-white group-hover:scale-110 transition-transform" />
            </div>
          )}
          <div className="absolute top-2 left-2">
            <Badge className="bg-[#0D0D0D] text-white text-xs">{plan.audience}</Badge>
          </div>
        </div>
        <CardContent className="p-3.5 flex-1 flex flex-col">
          <h4 className="font-semibold leading-tight text-sm">{plan.name}</h4>
          <p className="text-xs text-muted-foreground mt-1 line-clamp-2">{plan.description}</p>
          <ul className="mt-2 space-y-0.5 text-xs">
            {plan.includes.slice(0, 2).map((it) => (
              <li key={it.id} className="flex gap-1.5 items-start"><CheckCircle2 className="size-3.5 text-[#6BBF54] mt-0.5 shrink-0" /> {it.label}</li>
            ))}
            {plan.includes.length > 2 && <li className="text-[11px] text-muted-foreground pl-5">+ {plan.includes.length - 2} más</li>}
          </ul>
          <div className="mt-auto pt-3 flex items-end justify-between">
            <div>
              <div className="text-[10px] text-muted-foreground uppercase">Desde</div>
              <div className="text-base font-bold" style={{ color: BRAND.red }}>{fmtCOP(plan.basePrice)}</div>
            </div>
            <Button asChild size="sm" className="bg-[#6BBF54] hover:bg-[#5fae4a]" onClick={handle}>
              <a href={whatsappLink(plan.whatsappMessage)} target="_blank" rel="noreferrer">
                <MessageCircle className="size-3.5 mr-1" /> Solicitar
              </a>
            </Button>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
