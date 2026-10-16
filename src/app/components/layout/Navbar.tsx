import { useState } from "react";
import { Link, useLocation } from "react-router";
import { LogoMark } from "../common/LogoMark";
import { Button } from "../ui/button";
import { Menu, X, LogIn, Phone } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { whatsappLink } from "../../lib/helpers";
import { WithTooltip } from "../common/WithTooltip";

const links = [
  { to: "/", label: "Inicio" },
  { to: "/sobre-nosotros", label: "Sobre Nosotros" },
];

export function Navbar() {
  const [open, setOpen] = useState(false);
  const loc = useLocation();
  return (
    <header className="sticky top-0 z-40 backdrop-blur-md bg-white/85 border-b border-black/5">
      <div className="max-w-7xl mx-auto px-4 h-16 flex items-center gap-3">
        <Link to="/" className="flex items-center" aria-label="Inicio Total Recreación">
          <LogoMark size={36} />
        </Link>
        <nav className="ml-8 hidden md:flex items-center gap-1" aria-label="Principal">
          {links.map((l) => {
            const active = loc.pathname === l.to;
            return (
              <Link
                key={l.to} to={l.to}
                className={`relative px-3 py-2 rounded-md text-sm transition-colors ${active ? "text-[#F23545]" : "text-foreground/80 hover:text-[#F23545]"}`}
              >
                {l.label}
                {active && (
                  <motion.span layoutId="nav-underline" className="absolute left-2 right-2 -bottom-0.5 h-0.5 rounded bg-[#F23545]" />
                )}
              </Link>
            );
          })}
        </nav>
        <div className="ml-auto flex items-center gap-2">
          <a
            href={whatsappLink("Hola Total Recreación, quiero más información sobre sus servicios.")}
            target="_blank" rel="noreferrer"
            className="hidden sm:inline-flex items-center gap-2 px-3 h-9 rounded-md text-sm text-white bg-[#6BBF54] hover:bg-[#5fae4a] transition"
          >
            <Phone className="size-4" /> WhatsApp
          </a>
          <Button asChild variant="outline" size="sm" className="hidden sm:inline-flex">
            <Link to="/login"><LogIn className="size-4 mr-1" /> Acceso</Link>
          </Button>
          <WithTooltip label={open ? "Cerrar menú de navegación" : "Abrir menú de navegación"}>
            <button type="button" onClick={() => setOpen((o) => !o)} className="md:hidden inline-flex p-2 rounded-md hover:bg-muted" aria-label={open ? "Cerrar menú" : "Abrir menú"}>
              {open ? <X className="size-5" /> : <Menu className="size-5" />}
            </button>
          </WithTooltip>
        </div>
      </div>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }}
            className="md:hidden overflow-hidden border-t bg-white"
          >
            <div className="px-4 py-3 flex flex-col gap-1">
              {links.map((l) => (
                <Link key={l.to} to={l.to} onClick={() => setOpen(false)} className="px-3 py-2 rounded hover:bg-muted">
                  {l.label}
                </Link>
              ))}
              <Link to="/login" onClick={() => setOpen(false)} className="px-3 py-2 rounded hover:bg-muted">Acceso administradores</Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
