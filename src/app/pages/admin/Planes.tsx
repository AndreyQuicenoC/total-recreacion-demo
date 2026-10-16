import { useState } from "react";
import { useApp, newId } from "../../lib/store";
import type { Plan, PlanExtra, PlanInclude } from "../../lib/types";
import { PageHeader } from "../../components/common/PageHeader";
import { DataTable } from "../../components/common/DataTable";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { Label } from "../../components/ui/label";
import { Textarea } from "../../components/ui/textarea";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "../../components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../components/ui/select";
import { Badge } from "../../components/ui/badge";
import { PackagePlus, Plus, X, Trash2 } from "lucide-react";
import { toast } from "sonner";
import { WithTooltip } from "../../components/common/WithTooltip";
import { fmtCOP } from "../../lib/helpers";
import { NumberInput } from "../../components/common/NumberInput";

const empty: Plan = {
  id: "", categoryId: "", name: "", basePrice: 0, extras: [], description: "",
  audience: "General", whatsappMessage: "Hola Total Recreación, me interesa este plan.", includes: [], image: "",
};

export function PlanesPage() {
  const { plans, categories, setState, events } = useApp();
  const [editing, setEditing] = useState<Plan | null>(null);
  const [preview, setPreview] = useState<Plan | null>(null);
  const [detail, setDetail] = useState<Plan | null>(null);
  const [open, setOpen] = useState(false);
  const [include, setInclude] = useState("");

  const openCreate = () => { setEditing({ ...empty, categoryId: categories[0]?.id ?? "" }); setOpen(true); };
  const openEdit = (p: Plan) => { setEditing({ ...p, extras: [...p.extras], includes: [...p.includes] }); setOpen(true); };

  const save = () => {
    if (!editing) return;
    if (!editing.name.trim() || !editing.categoryId) { toast.error("Nombre y categoría son requeridos."); return; }
    setState((s) => {
      const exists = s.plans.find((x) => x.id === editing.id);
      const plans = exists ? s.plans.map((x) => x.id === editing.id ? editing : x) : [...s.plans, { ...editing, id: newId("p") }];
      return { ...s, plans };
    });
    toast.success(editing.id ? "Plan actualizado." : "Plan creado.");
    setOpen(false); setEditing(null); setInclude("");
  };

  const remove = (p: Plan) => {
    const used = events.filter((e) => e.planId === p.id);
    if (used.length) { toast.error(`No se puede eliminar: ${used.length} evento(s) usan este plan.`); return; }
    setState((s) => ({ ...s, plans: s.plans.filter((x) => x.id !== p.id) }));
    toast.success("Plan eliminado.");
  };

  const catName = (id: string) => categories.find((c) => c.id === id)?.name ?? "—";

  const addExtra = () => editing && setEditing({ ...editing, extras: [...editing.extras, { id: newId("e"), amount: 0, reason: "" }] });
  const updExtra = (id: string, patch: Partial<PlanExtra>) => editing && setEditing({ ...editing, extras: editing.extras.map((x) => x.id === id ? { ...x, ...patch } : x) });
  const rmExtra = (id: string) => editing && setEditing({ ...editing, extras: editing.extras.filter((x) => x.id !== id) });

  const addInclude = () => {
    if (!editing || !include.trim()) return;
    setEditing({ ...editing, includes: [...editing.includes, { id: newId("i"), label: include.trim() }] });
    setInclude("");
  };
  const rmInclude = (id: string) => editing && setEditing({ ...editing, includes: editing.includes.filter((x) => x.id !== id) });

  return (
    <>
      <PageHeader title="Planes" subtitle="Los planes alimentan los carruseles del inicio público." icon={<PackagePlus className="size-5" />}
        actions={<Button onClick={openCreate} className="bg-[#F23545] hover:bg-[#d92a39]"><Plus className="size-4 mr-1" /> Nuevo plan</Button>}
      />

      <DataTable
        rows={plans}
        searchKeys={["name", "audience", "description", (p) => catName((p as Plan).categoryId)]}
        getLabel={(p) => p.name}
        columns={[
          { key: "name", header: "Plan", render: (p) => <span className="font-medium">{p.name}</span> },
          { key: "cat", header: "Categoría", render: (p) => <Badge variant="outline">{catName(p.categoryId)}</Badge> },
          { key: "price", header: "Precio base", render: (p) => fmtCOP(p.basePrice) },
          { key: "extras", header: "Extras", render: (p) => p.extras.length },
          { key: "incl", header: "Incluye", render: (p) => `${p.includes.length} ítems` },
        ]}
        onView={setDetail}
        onPreview={setPreview}
        onEdit={openEdit}
        onDelete={remove}
      />

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
          <DialogHeader><DialogTitle>{editing?.id ? "Editar plan" : "Nuevo plan"}</DialogTitle></DialogHeader>
          {editing && (
            <div className="grid sm:grid-cols-2 gap-3">
              <div className="sm:col-span-2"><Label>Nombre *</Label><Input value={editing.name} onChange={(e) => setEditing({ ...editing, name: e.target.value })} /></div>
              <div>
                <Label>Categoría *</Label>
                <Select value={editing.categoryId} onValueChange={(v) => setEditing({ ...editing, categoryId: v })}>
                  <SelectTrigger><SelectValue /></SelectTrigger>
                  <SelectContent>{categories.map((c) => <SelectItem key={c.id} value={c.id}>{c.name}</SelectItem>)}</SelectContent>
                </Select>
              </div>
              <div><Label>Precio base (COP)</Label><NumberInput value={editing.basePrice} onChange={(v) => setEditing({ ...editing, basePrice: v ?? 0 })} min={0} /></div>
              <div><Label>Tipo de público</Label><Input value={editing.audience} onChange={(e) => setEditing({ ...editing, audience: e.target.value })} /></div>
              <div className="sm:col-span-2"><Label>URL de imagen (opcional)</Label><Input value={editing.image ?? ""} onChange={(e) => setEditing({ ...editing, image: e.target.value })} placeholder="https://…" /></div>
              <div className="sm:col-span-2"><Label>Descripción</Label><Textarea rows={3} value={editing.description} onChange={(e) => setEditing({ ...editing, description: e.target.value })} /></div>
              <div className="sm:col-span-2"><Label>Mensaje predeterminado WhatsApp</Label><Textarea rows={2} value={editing.whatsappMessage} onChange={(e) => setEditing({ ...editing, whatsappMessage: e.target.value })} /></div>

              <div className="sm:col-span-2 space-y-2">
                <div className="flex items-center justify-between"><Label>Valores extra</Label>
                  <Button type="button" size="sm" variant="outline" onClick={addExtra}><Plus className="size-3 mr-1" /> Agregar extra</Button></div>
                {editing.extras.length === 0 && <p className="text-xs text-muted-foreground">Ningún valor extra registrado.</p>}
                {editing.extras.map((x) => (
                  <div key={x.id} className="grid grid-cols-[1fr_2fr_auto] gap-2 items-end">
                    <div><Label className="text-xs">Valor</Label><NumberInput value={x.amount} onChange={(v) => updExtra(x.id, { amount: v ?? 0 })} min={0} /></div>
                    <div><Label className="text-xs">Motivo</Label><Input value={x.reason} onChange={(e) => updExtra(x.id, { reason: e.target.value })} placeholder="ej. evento con sonido" /></div>
                    <Button type="button" variant="ghost" size="icon" onClick={() => rmExtra(x.id)} className="text-red-600"><Trash2 className="size-4" /></Button>
                  </div>
                ))}
              </div>

              <div className="sm:col-span-2 space-y-2">
                <Label>Incluye</Label>
                <div className="flex gap-2">
                  <Input value={include} onChange={(e) => setInclude(e.target.value)} placeholder="ej. 2 animadores" onKeyDown={(e) => e.key === "Enter" && (e.preventDefault(), addInclude())} />
                  <Button type="button" variant="outline" onClick={addInclude}>Agregar</Button>
                </div>
                <div className="flex flex-wrap gap-2">
                  {editing.includes.map((i) => (
                    <Badge key={i.id} variant="secondary" className="gap-1">{i.label}{" "}
                    <WithTooltip label="Quitar inclusión">
                      <button type="button" onClick={() => rmInclude(i.id)} aria-label="Quitar inclusión"><X className="size-3" /></button>
                    </WithTooltip></Badge>
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
          <DialogHeader><DialogTitle>{preview?.name}</DialogTitle></DialogHeader>
          {preview && (
            <div className="text-sm space-y-2">
              <Badge variant="outline">{catName(preview.categoryId)}</Badge>
              <div className="text-2xl font-bold" style={{ color: "#F23545" }}>{fmtCOP(preview.basePrice)}</div>
              <p className="text-muted-foreground">{preview.description}</p>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setPreview(null)}>Cerrar</Button>
            <Button onClick={() => { if (preview) { setDetail(preview); setPreview(null); } }} className="bg-[#F23545] hover:bg-[#d92a39]">Ver al detalle</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={!!detail} onOpenChange={(o) => !o && setDetail(null)}>
        <DialogContent className="max-w-2xl">
          <DialogHeader><DialogTitle>{detail?.name}</DialogTitle></DialogHeader>
          {detail && (
            <div className="space-y-3 text-sm">
              <div className="flex gap-2 items-center"><Badge variant="outline">{catName(detail.categoryId)}</Badge><Badge>{detail.audience}</Badge></div>
              <p className="text-muted-foreground">{detail.description}</p>
              <div><strong>Precio base:</strong> {fmtCOP(detail.basePrice)}</div>
              {detail.extras.length > 0 && (
                <div>
                  <div className="text-xs uppercase text-muted-foreground">Valores extra</div>
                  <ul className="list-disc pl-5">{detail.extras.map((x) => <li key={x.id}>{x.reason}: <strong>{fmtCOP(x.amount)}</strong></li>)}</ul>
                </div>
              )}
              <div>
                <div className="text-xs uppercase text-muted-foreground">Incluye</div>
                <div className="flex flex-wrap gap-2 mt-1">{detail.includes.map((i) => <Badge key={i.id} variant="secondary">{i.label}</Badge>)}</div>
              </div>
              <div>
                <div className="text-xs uppercase text-muted-foreground">Mensaje WhatsApp</div>
                <pre className="bg-muted p-2 rounded text-xs whitespace-pre-wrap">{detail.whatsappMessage}</pre>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
}
