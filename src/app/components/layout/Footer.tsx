import { useState } from "react";
import { Link } from "react-router";
import { LogoMark } from "../common/LogoMark";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "../ui/dialog";
import { Instagram, Facebook, MapPin, Phone, Mail } from "lucide-react";
import { whatsappLink, BRAND } from "../../lib/helpers";
import { WithTooltip } from "../common/WithTooltip";

type SiteLink =
  | { label: string; to: string; href?: never }
  | { label: string; href: string; to?: never };

const SITE_MAP: SiteLink[] = [
  { label: "Inicio", to: "/" },
  { label: "Sobre Nosotros", to: "/sobre-nosotros" },
  { label: "Únete al equipo", href: whatsappLink("Hola Total Recreación, me gustaría postularme para trabajar con ustedes.") },
  { label: "Acceso administradores", to: "/login" },
];

const TERMS = `
Total Recreación, identificada con NIT en la ciudad de Cali (Valle del Cauca, Colombia), pone a disposición de sus
clientes los siguientes términos y condiciones para el uso y contratación de los servicios recreativos.

1. Objeto. La empresa ofrece servicios de recreación, animación, montaje técnico (sonido, luces, humo) y estaciones de
alimentación interactiva para eventos privados y corporativos. La cotización entregada a través de WhatsApp o correo
electrónico se considera vinculante una vez aceptada por escrito por ambas partes.

2. Reservas y pagos. Para confirmar la fecha del evento se debe realizar un abono mínimo equivalente al 50% del valor
total. El saldo restante se cancelará el día del evento antes del inicio de las actividades. Total Recreación se reserva
el derecho de reagendar la actividad si no se cumple con los abonos pactados.

3. Garantía Total. Como sello distintivo, la empresa ofrece la promesa “Garantía Total: si no te gusta, no pagas”. Para
hacer efectiva esta garantía el cliente debe expresar su inconformidad durante el desarrollo del evento y permitir al
coordinador la oportunidad de hacer los ajustes necesarios.

4. Cancelaciones. Cancelaciones con más de 7 días de anticipación generan devolución del 80% del abono. Cancelaciones
con menos de 48 horas pierden el abono pero podrán reagendarse en un plazo no mayor a 60 días.

5. Responsabilidad. Total Recreación cuenta con personal capacitado y pólizas de responsabilidad civil. No obstante, no
se hace responsable por daños o pérdidas derivadas del mal uso por parte de los asistentes del evento.
`;

const POLICY = `
Política de tratamiento de datos personales — Total Recreación.

En cumplimiento de la Ley 1581 de 2012 y el Decreto 1377 de 2013 de la República de Colombia, Total Recreación informa
a sus usuarios y clientes sobre el tratamiento de los datos personales recopilados a través de sus canales digitales
(sitio web, WhatsApp, correo electrónico, redes sociales).

1. Finalidad. Los datos recopilados (nombre, número de contacto, dirección, correo electrónico) se utilizan exclusivamente
para gestionar reservas, enviar cotizaciones, coordinar logística del evento y mantener comunicación post-servicio.

2. Almacenamiento. La información se almacena en sistemas internos protegidos con autenticación y acceso restringido al
personal administrativo. No se comparte con terceros con fines comerciales.

3. Derechos del titular. El usuario podrá en cualquier momento solicitar acceso, rectificación, supresión o portabilidad
de sus datos enviando un correo a admin@totalrecreacion.co o por WhatsApp al +57 304 367 7885.

4. Cookies. El sitio puede almacenar información local del navegador para personalizar la experiencia. El usuario puede
desactivarlas desde la configuración de su navegador sin afectar la funcionalidad principal.

5. Cambios. Esta política puede ser actualizada. La fecha de última actualización se mantiene visible en este documento.
`;

export function Footer() {
  const [openTerms, setOpenTerms] = useState(false);
  const [openPolicy, setOpenPolicy] = useState(false);
  return (
    <footer className="mt-20 bg-[#0D0D0D] text-white">
      <div className="max-w-7xl mx-auto px-4 py-12 grid gap-8 md:grid-cols-4">
        <div>
          <div className="bg-white rounded-lg p-3 inline-block"><LogoMark size={42} /></div>
          <p className="text-white/70 text-sm mt-4 leading-relaxed">
            Diversión, creatividad y compromiso para tus eventos. Recreadores y servicios que inspiran sonrisas en toda la región del Valle del Cauca.
          </p>
          <p className="mt-3 text-xs uppercase tracking-widest text-[#F2E313]">Garantía Total · Si no te gusta no pagas</p>
        </div>
        <div>
          <h3 className="text-white font-semibold mb-3">Mapa del sitio</h3>
          <ul className="space-y-2 text-sm">
            {SITE_MAP.map((l) =>
              l.to ? (
                <li key={l.label}><Link to={l.to} className="text-white/70 hover:text-[#F2E313] transition">{l.label}</Link></li>
              ) : (
                <li key={l.label}><a href={l.href} target="_blank" rel="noreferrer" className="text-white/70 hover:text-[#F2E313] transition">{l.label}</a></li>
              ),
            )}
            <li>
              <WithTooltip label="Leer términos y condiciones del servicio">
                <button type="button" onClick={() => setOpenTerms(true)} className="text-white/70 hover:text-[#F2E313] transition">Términos y condiciones</button>
              </WithTooltip>
            </li>
            <li>
              <WithTooltip label="Leer política de privacidad y datos personales">
                <button type="button" onClick={() => setOpenPolicy(true)} className="text-white/70 hover:text-[#F2E313] transition">Política de privacidad</button>
              </WithTooltip>
            </li>
          </ul>
        </div>
        <div>
          <h3 className="text-white font-semibold mb-3">Contacto</h3>
          <ul className="space-y-2 text-sm text-white/70">
            <li className="flex items-start gap-2"><MapPin className="size-4 mt-0.5 text-[#F23545]" /> Calle 14C #36B-20, Santiago de Cali</li>
            <li className="flex items-center gap-2"><Phone className="size-4 text-[#6BBF54]" /> +57 304 367 7885</li>
            <li className="flex items-center gap-2"><Mail className="size-4 text-[#F27B35]" /> hola@totalrecreacion.co</li>
          </ul>
        </div>
        <div>
          <h3 className="text-white font-semibold mb-3">Síguenos</h3>
          <div className="flex gap-3">
            <a href="https://instagram.com/totalrecreacion" target="_blank" rel="noreferrer" className="grid place-items-center size-10 rounded-full bg-white/10 hover:bg-[#F23545] transition" aria-label="Instagram"><Instagram className="size-4" /></a>
            <a href="https://www.facebook.com/TotalRecreacion" target="_blank" rel="noreferrer" className="grid place-items-center size-10 rounded-full bg-white/10 hover:bg-[#F23545] transition" aria-label="Facebook"><Facebook className="size-4" /></a>
            <a href={whatsappLink("Hola Total Recreación")} target="_blank" rel="noreferrer" className="grid place-items-center size-10 rounded-full bg-white/10 hover:bg-[#6BBF54] transition" aria-label="WhatsApp"><Phone className="size-4" /></a>
          </div>
        </div>
      </div>
      <div className="border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 py-4 text-xs text-white/50 flex flex-wrap items-center justify-between gap-2">
          <span>© {new Date().getFullYear()} Total Recreación. Todos los derechos reservados.</span>
          <span>Construido con accesibilidad WCAG AA y estándares ISO/IEC 25010.</span>
        </div>
        <div className="max-w-7xl mx-auto px-4 pb-4 text-xs text-white/40 text-center">
          ClustLayer · <em>Eureka Solutions Projects</em>
        </div>
      </div>

      <Dialog open={openTerms} onOpenChange={setOpenTerms}>
        <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle style={{ color: BRAND.red }}>Términos y condiciones</DialogTitle>
            <DialogDescription>Última actualización: {new Date().toLocaleDateString("es-CO")}</DialogDescription>
          </DialogHeader>
          <pre className="whitespace-pre-wrap text-sm text-foreground leading-relaxed">{TERMS}</pre>
        </DialogContent>
      </Dialog>
      <Dialog open={openPolicy} onOpenChange={setOpenPolicy}>
        <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle style={{ color: BRAND.red }}>Política de privacidad</DialogTitle>
            <DialogDescription>Tratamiento de datos personales conforme a la ley colombiana.</DialogDescription>
          </DialogHeader>
          <pre className="whitespace-pre-wrap text-sm text-foreground leading-relaxed">{POLICY}</pre>
        </DialogContent>
      </Dialog>
    </footer>
  );
}
