import { useState } from "react";
import { useApp } from "../../lib/store";
import { PageHeader } from "../../components/common/PageHeader";
import { Card, CardContent } from "../../components/ui/card";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { Label } from "../../components/ui/label";
import { UserCog, Eye, EyeOff } from "lucide-react";
import { toast } from "sonner";
import { WithTooltip } from "../../components/common/WithTooltip";

export function PerfilPage() {
  const { admin, setState } = useApp();
  const [form, setForm] = useState({ name: admin.name, email: admin.email });
  const [pwd, setPwd] = useState({ current: "", next: "", confirm: "" });
  const [show, setShow] = useState(false);

  const saveProfile = () => {
    if (!form.name.trim() || !form.email.trim()) { toast.error("Nombre y correo son requeridos."); return; }
    setState((s) => ({ ...s, admin: { ...s.admin, name: form.name, email: form.email } }));
    toast.success("Perfil actualizado.");
  };

  const savePwd = () => {
    if (pwd.current !== admin.password) { toast.error("Contraseña actual incorrecta."); return; }
    if (pwd.next.length < 6) { toast.error("La nueva contraseña debe tener al menos 6 caracteres."); return; }
    if (pwd.next !== pwd.confirm) { toast.error("Las contraseñas nuevas no coinciden."); return; }
    setState((s) => ({ ...s, admin: { ...s.admin, password: pwd.next } }));
    setPwd({ current: "", next: "", confirm: "" });
    toast.success("Contraseña actualizada.");
  };

  return (
    <>
      <PageHeader title="Editar perfil" subtitle="Gestiona tus datos de acceso." icon={<UserCog className="size-5" />} />
      <div className="grid md:grid-cols-2 gap-4">
        <Card><CardContent className="p-6 space-y-3">
          <h3 className="font-semibold">Datos personales</h3>
          <div><Label>Nombre</Label><Input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} /></div>
          <div><Label>Correo</Label><Input type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} /></div>
          <Button onClick={saveProfile} className="bg-[#F23545] hover:bg-[#d92a39]">Guardar cambios</Button>
        </CardContent></Card>

        <Card><CardContent className="p-6 space-y-3">
          <h3 className="font-semibold">Cambiar contraseña</h3>
          {(["current", "next", "confirm"] as const).map((k) => (
            <div key={k}>
              <Label>{k === "current" ? "Actual" : k === "next" ? "Nueva" : "Confirmar nueva"}</Label>
              <div className="relative">
                <Input type={show ? "text" : "password"} value={pwd[k]} onChange={(e) => setPwd({ ...pwd, [k]: e.target.value })} className="pr-10" />
                {k === "current" && (
                  <WithTooltip label={show ? "Ocultar contraseñas" : "Mostrar contraseñas"}>
                    <button type="button" onClick={() => setShow((s) => !s)} className="absolute right-2 top-2 p-1 rounded hover:bg-muted text-muted-foreground" aria-label={show ? "Ocultar contraseñas" : "Mostrar contraseñas"}>
                      {show ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
                    </button>
                  </WithTooltip>
                )}
              </div>
            </div>
          ))}
          <Button onClick={savePwd} className="bg-[#0D0D0D] hover:bg-black">Actualizar contraseña</Button>
        </CardContent></Card>
      </div>
    </>
  );
}
