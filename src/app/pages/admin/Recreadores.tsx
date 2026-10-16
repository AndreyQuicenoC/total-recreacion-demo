import { useState } from "react";
import { useApp, newId } from "../../lib/store";
import type { Recreator } from "../../lib/types";
import { PageHeader } from "../../components/common/PageHeader";
import { DataTable } from "../../components/common/DataTable";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { Label } from "../../components/ui/label";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "../../components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../components/ui/select";
import { Switch } from "../../components/ui/switch";
import { Badge } from "../../components/ui/badge";
import { NumberInput } from "../../components/common/NumberInput";
import { Users, Plus, X, MessageCircle } from "lucide-react";
import { toast } from "sonner";
import { WithTooltip } from "../../components/common/WithTooltip";
import { fmtCOP, yearsBetween, fmtDate, whatsappLink, normalizePhone } from "../../lib/helpers";

const empty: Recreator = {
  id: "", fullName: "", phone: "", email: "", documentId: "", joinDate: new Date().toISOString().slice(0, 10),
  courses: [], salary: 0, tagId: null, active: true,
};

export function RecreadoresPage() {
  const { recreators, tags, setState } = useApp();
  const [editing, setEditing] = useState<Recreator | null>(null);
  const [preview, setPreview] = useState<Recreator | null>(null);
  const [detail, setDetail] = useState<Recreator | null>(null);
  const [open, setOpen] = useState(false);
  const [course, setCourse] = useState("");

  const openCreate = () => { setEditing({ ...empty }); setOpen(true); };
  const openEdit = (r: Recreator) => { setEditing({ ...r }); setOpen(true); };

  const save = () => {
    if (!editing) return;
    if (!editing.fullName.trim() || !editing.phone.trim()) { toast.error("Nombre y contacto son requeridos."); return; }
    setState((s) => {
      const exists = s.recreators.find((x) => x.id === editing.id);
      const recreators = exists
        ? s.recreators.map((x) => (x.id === editing.id ? editing : x))
        : [...s.recreators, { ...editing, id: newId("r") }];
      return { ...s, recreators };
    });
    toast.success(editing.id ? "Recreador actualizado." : "Recreador creado.");
    setOpen(false); setEditing(null); setCourse("");
  };

  const remove = (r: Recreator) => {
    setState((s) => ({ ...s, recreators: s.recreators.filter((x) => x.id !== r.id) }));
    toast.success("Recreador eliminado.");
  };

  const tagName = (id?: string | null) => tags.find((t) => t.id === id)?.name ?? "Sin etiqueta";
  const tagColor = (id?: string | null) => tags.find((t) => t.id === id)?.color ?? "#999999";

  return (
    <>
      <PageHeader
        title="Equipo de recreadores" subtitle="Gestiona el talento humano que da vida a los eventos."
        icon={<Users className="size-5" />}
        actions={<Button onClick={openCreate} className="bg-[#F23545] hover:bg-[#d92a39]"><Plus className="size-4 mr-1" /> Nuevo recreador</Button>}
      />

      <DataTable
        rows={recreators}
        searchKeys={["fullName", "phone", "documentId", "email"]}
        searchPlaceholder="Buscar por nombre, teléfono o cédula…"
        getLabel={(r) => r.fullName}
        columns={[
          { key: "name", header: "Nombre", render: (r) => <span className="font-medium">{r.fullName}</span> },
          { key: "phone", header: "Contacto", render: (r) => <span className="text-sm">{normalizePhone(r.phone) || r.phone}</span> },
          { key: "tag", header: "Etiqueta", render: (r) => (
            <Badge style={{ background: tagColor(r.tagId), color: tagColor(r.tagId) === "#F2E313" ? "#0D0D0D" : "white" }}>{tagName(r.tagId)}</Badge>
          ) },
          { key: "status", header: "Estado", render: (r) => (
            r.active ? <Badge className="bg-[#6BBF54]">Activo</Badge> : <Badge variant="secondary">Inactivo</Badge>
          ) },
          { key: "years", header: "Experiencia", render: (r) => <span className="text-sm">{yearsBetween(r.joinDate)} años</span> },
          { key: "salary", header: "Sueldo", render: (r) => <span className="text-sm">{fmtCOP(r.salary)}</span> },
          { key: "wa", header: "WhatsApp", render: (r) => (
            <Button asChild size="icon" variant="ghost" className="text-[#25D366] hover:bg-emerald-50" aria-label="Abrir WhatsApp">
              <a href={whatsappLink(`Hola ${r.fullName}, te escribo de Total Recreación.`, r.phone)} target="_blank" rel="noreferrer">
                <MessageCircle className="size-4" />
              </a>
            </Button>
          ) },
        ]}
        onView={setDetail}
        onPreview={setPreview}
        onEdit={openEdit}
        onDelete={remove}
      />

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader><DialogTitle>{editing?.id ? "Editar recreador" : "Nuevo recreador"}</DialogTitle></DialogHeader>
          {editing && (
            <div className="grid sm:grid-cols-2 gap-3">
              <div className="sm:col-span-2"><Label>Nombre completo *</Label><Input value={editing.fullName} onChange={(e) => setEditing({ ...editing, fullName: e.target.value })} /></div>
              <div><Label>Teléfono *</Label><Input value={editing.phone} onChange={(e) => setEditing({ ...editing, phone: e.target.value })} /></div>
              <div><Label>Correo (opcional)</Label><Input type="email" value={editing.email ?? ""} onChange={(e) => setEditing({ ...editing, email: e.target.value })} /></div>
              <div><Label>Cédula (opcional)</Label><Input value={editing.documentId ?? ""} onChange={(e) => setEditing({ ...editing, documentId: e.target.value })} /></div>
              <div><Label>Fecha de ingreso</Label><Input type="date" value={editing.joinDate} onChange={(e) => setEditing({ ...editing, joinDate: e.target.value })} /></div>
              <div><Label>Sueldo (COP)</Label><NumberInput value={editing.salary} onChange={(v) => setEditing({ ...editing, salary: v ?? 0 })} min={0} /></div>
              <div>
                <Label>Etiqueta</Label>
                <Select value={editing.tagId ?? "none"} onValueChange={(v) => setEditing({ ...editing, tagId: v === "none" ? null : v })}>
                  <SelectTrigger><SelectValue placeholder="Sin etiqueta" /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="none">Sin etiqueta</SelectItem>
                    {tags.map((t) => <SelectItem key={t.id} value={t.id}>{t.name}</SelectItem>)}
                  </SelectContent>
                </Select>
              </div>
              <div className="flex items-center gap-3 pt-6">
                <Switch checked={editing.active} onCheckedChange={(v) => setEditing({ ...editing, active: v })} id="rec-active" />
                <Label htmlFor="rec-active">{editing.active ? "Activo" : "Inactivo"}</Label>
              </div>
              <div className="sm:col-span-2">
                <Label>Cursos realizados</Label>
                <div className="flex gap-2 mt-1.5">
                  <Input value={course} onChange={(e) => setCourse(e.target.value)} placeholder="Ej: Globoflexia" onKeyDown={(e) => {
                    if (e.key === "Enter" && course.trim()) { e.preventDefault(); setEditing({ ...editing, courses: [...editing.courses, course.trim()] }); setCourse(""); }
                  }} />
                  <Button type="button" variant="outline" onClick={() => { if (course.trim()) { setEditing({ ...editing, courses: [...editing.courses, course.trim()] }); setCourse(""); } }}>Agregar</Button>
                </div>
                <div className="flex flex-wrap gap-2 mt-2">
                  {editing.courses.map((c, i) => (
                    <Badge key={`${c}-${i}`} variant="secondary" className="gap-1">
                      {c}{" "}
                      <WithTooltip label="Quitar curso">
                        <button type="button" onClick={() => setEditing({ ...editing, courses: editing.courses.filter((_, j) => j !== i) })} aria-label="Quitar curso"><X className="size-3" /></button>
                      </WithTooltip>
                    </Badge>
                  ))}
                </div>
              </div>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setOpen(false)}>Cancelar</Button>
            <Button onClick={save} className="bg-[#F23545] hover:bg-[#d92a39]">Guardar</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={!!preview} onOpenChange={(o) => !o && setPreview(null)}>
        <DialogContent>
          <DialogHeader><DialogTitle>Vista rápida · {preview?.fullName}</DialogTitle></DialogHeader>
          {preview && (
            <div className="space-y-2 text-sm">
              <div className="flex gap-2">
                <Badge style={{ background: tagColor(preview.tagId), color: tagColor(preview.tagId) === "#F2E313" ? "#0D0D0D" : "white" }}>{tagName(preview.tagId)}</Badge>
                {preview.active ? <Badge className="bg-[#6BBF54]">Activo</Badge> : <Badge variant="secondary">Inactivo</Badge>}
              </div>
              <div><strong>Contacto:</strong> {preview.phone}</div>
              <div><strong>Experiencia:</strong> {yearsBetween(preview.joinDate)} años (desde {fmtDate(preview.joinDate)})</div>
              <div><strong>Sueldo:</strong> {fmtCOP(preview.salary)}</div>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setPreview(null)}>Cerrar</Button>
            <Button onClick={() => { if (preview) { setDetail(preview); setPreview(null); } }} className="bg-[#F23545] hover:bg-[#d92a39]">Ver al detalle</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={!!detail} onOpenChange={(o) => !o && setDetail(null)}>
        <DialogContent className="max-w-xl">
          <DialogHeader><DialogTitle>{detail?.fullName}</DialogTitle></DialogHeader>
          {detail && (
            <div className="space-y-3 text-sm">
              <div className="grid grid-cols-2 gap-3">
                <Field l="Teléfono" v={detail.phone} />
                <Field l="Estado" v={detail.active ? "Activo" : "Inactivo"} />
                <Field l="Correo" v={detail.email || "—"} />
                <Field l="Cédula" v={detail.documentId || "—"} />
                <Field l="Etiqueta" v={tagName(detail.tagId)} />
                <Field l="Ingreso" v={fmtDate(detail.joinDate)} />
                <Field l="Experiencia" v={`${yearsBetween(detail.joinDate)} años`} />
                <Field l="Sueldo" v={fmtCOP(detail.salary)} />
              </div>
              <div>
                <div className="text-xs text-muted-foreground uppercase">Cursos</div>
                <div className="flex flex-wrap gap-2 mt-1">
                  {detail.courses.length ? detail.courses.map((c, i) => <Badge key={`${c}-${i}`} variant="secondary">{c}</Badge>) : <span className="text-muted-foreground">Ninguno registrado.</span>}
                </div>
              </div>
              <div className="pt-2">
                <Button asChild className="bg-[#25D366] hover:bg-[#1faa53]">
                  <a href={whatsappLink(`Hola ${detail.fullName}, te escribo de Total Recreación.`, detail.phone)} target="_blank" rel="noreferrer">
                    <MessageCircle className="size-4 mr-1" /> WhatsApp
                  </a>
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
}

function Field({ l, v }: { l: string; v: React.ReactNode }) {
  return <div><div className="text-xs uppercase text-muted-foreground">{l}</div><div className="font-medium">{v}</div></div>;
}
