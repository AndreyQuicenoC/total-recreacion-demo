import { useState } from "react";
import { Link, useNavigate } from "react-router";
import { useApp } from "../lib/store";
import { motion } from "motion/react";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { Card, CardContent } from "../components/ui/card";
import { Eye, EyeOff, Lock, Mail, ShieldCheck, ArrowLeft } from "lucide-react";
import { toast } from "sonner";
import { LogoMark } from "../components/common/LogoMark";
import { Footer } from "../components/layout/Footer";
import { WithTooltip } from "../components/common/WithTooltip";

export function LoginPage() {
  const { login } = useApp();
  const nav = useNavigate();
  const [email, setEmail] = useState("");
  const [pwd, setPwd] = useState("");
  const [show, setShow] = useState(false);
  const [err, setErr] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    setErr(null); setLoading(true);
    setTimeout(() => {
      if (login(email, pwd)) {
        toast.success("¡Bienvenido de vuelta!");
        nav("/admin");
      } else {
        setErr("Correo o contraseña incorrectos. Verifica tus credenciales.");
      }
      setLoading(false);
    }, 350);
  };

  return (
    <div className="min-h-screen flex flex-col">
    <div className="grid lg:grid-cols-2 bg-[#0D0D0D] text-white flex-1">
      <div className="relative hidden lg:block overflow-hidden">
        <img src="https://images.unsplash.com/photo-1530103862676-de8c9debad1d?w=1400&q=80" alt="" className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-br from-[#0D0D0D]/85 via-[#F23545]/40 to-[#F2E313]/30" />
        <div className="relative h-full flex flex-col p-10">
          <div className="bg-white inline-block rounded-lg p-3 self-start"><LogoMark size={42} /></div>
          <div className="mt-auto">
            <ShieldCheck className="size-10 text-[#F2E313]" />
            <h2 className="text-3xl font-bold mt-3">Panel de coordinación</h2>
            <p className="mt-2 text-white/80 max-w-md">Centraliza el flujo de tu agenda, equipo, clientes y estadísticas. Acceso exclusivo para administradores.</p>
          </div>
        </div>
      </div>
      <div className="flex items-center justify-center p-6 bg-white text-foreground">
        <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className="w-full max-w-md">
          <Link to="/" className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground mb-6">
            <ArrowLeft className="size-4" /> Volver al sitio
          </Link>
          <Card className="border-2">
            <CardContent className="p-8">
              <h1 className="text-2xl font-bold">Acceso administradores</h1>
              <p className="text-sm text-muted-foreground mt-1">Ingresa con tus credenciales corporativas.</p>
              <form onSubmit={submit} className="mt-6 space-y-4" noValidate>
                <div>
                  <Label htmlFor="email">Correo electrónico</Label>
                  <div className="relative mt-1.5">
                    <Mail className="absolute left-3 top-2.5 size-4 text-muted-foreground" />
                    <Input id="email" type="email" autoComplete="email" required value={email}
                      onChange={(e) => { setEmail(e.target.value); setErr(null); }}
                      placeholder="admin@totalrecreacion.co" className="pl-9" aria-invalid={!!err} />
                  </div>
                </div>
                <div>
                  <Label htmlFor="pwd">Contraseña</Label>
                  <div className="relative mt-1.5">
                    <Lock className="absolute left-3 top-2.5 size-4 text-muted-foreground" />
                    <Input id="pwd" type={show ? "text" : "password"} autoComplete="current-password" required value={pwd}
                      onChange={(e) => { setPwd(e.target.value); setErr(null); }}
                      placeholder="••••••••" className="pl-9 pr-10" aria-invalid={!!err} aria-describedby={err ? "pwd-err" : undefined} />
                    <WithTooltip label={show ? "Ocultar contraseña" : "Mostrar contraseña"}>
                      <button type="button" onClick={() => setShow((s) => !s)}
                        className="absolute right-2 top-2 p-1 rounded hover:bg-muted text-muted-foreground"
                        aria-label={show ? "Ocultar contraseña" : "Mostrar contraseña"}>
                        {show ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
                      </button>
                    </WithTooltip>
                  </div>
                  {err && <p id="pwd-err" className="text-sm text-red-600 mt-1.5">{err}</p>}
                </div>
                <Button type="submit" disabled={loading} className="w-full bg-[#F23545] hover:bg-[#d92a39] h-11">
                  {loading ? "Validando…" : "Iniciar sesión"}
                </Button>
                <div className="text-xs text-muted-foreground text-center pt-2">
                  Credenciales demo: <span className="font-mono">admin@totalrecreacion.co / admin123</span>
                </div>
              </form>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
    <Footer />
    </div>
  );
}
