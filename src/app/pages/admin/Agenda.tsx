import { useMemo, useState } from "react";
import { useApp, newId } from "../../lib/store";
import type { ScheduledEvent } from "../../lib/types";
import { PageHeader } from "../../components/common/PageHeader";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { Label } from "../../components/ui/label";
import { Textarea } from "../../components/ui/textarea";
import { Card, CardContent } from "../../components/ui/card";
import { Badge } from "../../components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "../../components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../components/ui/select";
import { Checkbox } from "../../components/ui/checkbox";
import { ConfirmDelete } from "../../components/common/ConfirmDelete";
import { WithTooltip } from "../../components/common/WithTooltip";
import { NumberInput } from "../../components/common/NumberInput";
import {
  CalendarRange, Plus, MapPin, Users, Star, Calendar as CalIcon, Pencil, Eye, FileSearch, X,
} from "lucide-react";
import { toast } from "sonner";
import { fmtCOP, fmtDate } from "../../lib/helpers";
import { motion, AnimatePresence } from "motion/react";
import { Link } from "react-router";

type Filter = "all" | "upcoming" | "past";

const emptyEvent = (): ScheduledEvent => ({
  id: "", title: "", description: "", address: "", contactPhone: "",
  date: new Date().toISOString().slice(0, 10), startTime: "10:00", endTime: "13:00",
  planId: "", selectedExtraId: null, clientId: "", recreatorIds: [],
  checklist: [], transportCost: 0, materialCost: 0, rating: null, ratingComment: "",
  createdAt: new Date().toISOString(),
});

export function AgendaPage() {
  const { events, plans, clients, recreators, categories, materials, setState, computeUtility } = useApp();
  const [filter, setFilter] = useState<Filter>("upcoming");
  const [fCategory, setFCategory] = useState<string>("all");
  const [fPlan, setFPlan] = useState<string>("all");
  const [fRecreator, setFRecreator] = useState<string>("all");

  const [editing, setEditing] = useState<ScheduledEvent | null>(null);
  const [preview, setPreview] = useState<ScheduledEvent | null>(null);
  const [open, setOpen] = useState(false);
  const [materialTpl, setMaterialTpl] = useState<string>("none");
  const [newCheck, setNewCheck] = useState("");

  const activeRecreators = useMemo(() => recreators.filter((r) => r.active), [recreators]);

  const today = new Date(); today.setHours(0, 0, 0, 0);

  const filtered = useMemo(() => {
    return events
      .filter((e) => {
        const d = new Date(e.date);
        if (filter === "upcoming" && d < today) return false;
        if (filter === "past" && d >= today) return false;
        return true;
      })
      .filter((e) => fPlan === "all" || e.planId === fPlan)
      .filter((e) => fCategory === "all" || plans.find((p) => p.id === e.planId)?.categoryId === fCategory)
      .filter((e) => fRecreator === "all" || e.recreatorIds.includes(fRecreator))
      .sort((a, b) => a.date.localeCompare(b.date) || a.startTime.localeCompare(b.startTime));
  }, [events, filter, fCategory, fPlan, fRecreator, plans, today]);

  const openCreate = () => {
    setEditing({ ...emptyEvent(), planId: plans[0]?.id ?? "", clientId: clients[0]?.id ?? "" });
    setMaterialTpl("none"); setOpen(true);
  };
  const openEdit = (e: ScheduledEvent) => { setEditing({ ...e, recreatorIds: [...e.recreatorIds], checklist: [...e.checklist] }); setMaterialTpl("none"); setOpen(true); };

  const applyTemplate = (id: string) => {
    if (!editing) return;
    setMaterialTpl(id);
    if (id === "none") return;
    const tpl = materials.find((m) => m.id === id);
    if (!tpl) return;
    setEditing({
      ...editing,
      checklist: tpl.items.map((it) => ({ id: newId("ch"), label: it.label, done: false })),
    });
    toast.message(`Plantilla aplicada: ${tpl.name}`);
  };

  const save = () => {
    if (!editing) return;
    if (!editing.title.trim() || !editing.planId || !editing.clientId || !editing.address.trim()) {
      toast.error("Completa título, plan, cliente y ubicación."); return;
    }
    if (editing.recreatorIds.length === 0) { toast.error("Asocia al menos un recreador."); return; }
    const utility = computeUtility(editing);
    const final: ScheduledEvent = { ...editing, utility };
    setState((s) => {
      const exists = s.events.find((x) => x.id === editing.id);
      const evs = exists ? s.events.map((x) => x.id === editing.id ? final : x) : [...s.events, { ...final, id: newId("ev") }];
      return { ...s, events: evs };
    });
    toast.success(editing.id ? "Evento actualizado." : "Evento agendado.");
    setOpen(false); setEditing(null);
  };

  const remove = (e: ScheduledEvent) => {
    setState((s) => ({ ...s, events: s.events.filter((x) => x.id !== e.id) }));
    toast.success("Evento eliminado.");
  };

  return (
    <>
      <PageHeader
        title="Agenda" subtitle="Coordina cada evento de principio a fin." icon={<CalendarRange className="size-5" />}
        actions={<Button onClick={openCreate} className="bg-[#F23545] hover:bg-[#d92a39]"><Plus className="size-4 mr-1" /> Agendar evento</Button>}
      />

      <Card className="mb-5">
        <CardContent className="p-4 flex flex-wrap gap-3 items-end">
          <div>
            <Label className="text-xs">Estado</Label>
            <div className="inline-flex rounded-lg border p-0.5 ml-2">
              {(["upcoming", "past", "all"] as Filter[]).map((f) => {
                const label = f === "upcoming" ? "Actuales" : f === "past" ? "Anteriores" : "Todos";
                return (
                  <WithTooltip key={f} label={`Filtrar eventos: ${label}`}>
                    <button type="button" onClick={() => setFilter(f)} aria-pressed={filter === f}
                      className={`px-3 py-1.5 rounded-md text-sm transition ${filter === f ? "bg-[#F23545] text-white" : "hover:bg-muted"}`}>
                      {label}
                    </button>
                  </WithTooltip>
                );
              })}
            </div>
          </div>
          <div className="min-w-[180px]">
            <Label className="text-xs">Categoría</Label>
            <Select value={fCategory} onValueChange={setFCategory}>
              <SelectTrigger><SelectValue /></SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todas</SelectItem>
                {categories.map((c) => <SelectItem key={c.id} value={c.id}>{c.name}</SelectItem>)}
              </SelectContent>
            </Select>
          </div>
          <div className="min-w-[180px]">
            <Label className="text-xs">Plan</Label>
            <Select value={fPlan} onValueChange={setFPlan}>
              <SelectTrigger><SelectValue /></SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todos</SelectItem>
                {plans.map((p) => <SelectItem key={p.id} value={p.id}>{p.name}</SelectItem>)}
              </SelectContent>
            </Select>
          </div>
          <div className="min-w-[180px]">
            <Label className="text-xs">Recreador</Label>
            <Select value={fRecreator} onValueChange={setFRecreator}>
              <SelectTrigger><SelectValue /></SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todos</SelectItem>
                {activeRecreators.map((r) => <SelectItem key={r.id} value={r.id}>{r.fullName}</SelectItem>)}
              </SelectContent>
            </Select>
          </div>
          <div className="ml-auto text-sm text-muted-foreground">{filtered.length} evento(s)</div>
        </CardContent>
      </Card>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        <AnimatePresence>
          {filtered.map((e) => {
            const plan = plans.find((p) => p.id === e.planId);
            const client = clients.find((c) => c.id === e.clientId);
            const past = new Date(e.date) < today;
            return (
              <motion.div key={e.id} layout initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, scale: 0.95 }} transition={{ duration: 0.2 }}>
                <Card className={`overflow-hidden h-full ${past ? "opacity-80" : ""}`}>
                  <div className="h-2" style={{ background: past ? "#999" : "#F23545" }} />
                  <CardContent className="p-4 space-y-2">
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <h3 className="font-semibold leading-tight">{e.title}</h3>
                        <div className="text-xs text-muted-foreground mt-1 flex items-center gap-1"><CalIcon className="size-3" /> {fmtDate(e.date)} · {e.startTime}–{e.endTime}</div>
                      </div>
                      {past && <Badge variant="secondary">Finalizado</Badge>}
                    </div>
                    <div className="text-sm text-muted-foreground flex items-start gap-1"><MapPin className="size-3.5 mt-0.5" /> {e.address}</div>
                    <Badge variant="outline">{plan?.name}</Badge>
                    <div className="text-xs text-muted-foreground">Cliente: <span className="text-foreground">{client?.name}</span></div>
                    <div className="text-xs text-muted-foreground flex items-center gap-1"><Users className="size-3" /> {e.recreatorIds.length} recreador(es)</div>
                    {e.rating != null && (
                      <div className="flex items-center gap-1 text-xs"><Star className="size-3 fill-[#F2E313] text-[#F2E313]" /> {e.rating}/5</div>
                    )}
                    <div className="flex gap-1 pt-2">
                      <Button asChild size="icon" variant="ghost" aria-label="Ver al detalle">
                        <Link to={`/admin/agenda/${e.id}`}><FileSearch className="size-4" /></Link>
                      </Button>
                      <Button size="icon" variant="ghost" onClick={() => setPreview(e)} aria-label="Previsualizar"><Eye className="size-4" /></Button>
                      <Button size="icon" variant="ghost" onClick={() => openEdit(e)} aria-label="Editar"><Pencil className="size-4" /></Button>
                      <ConfirmDelete itemLabel={e.title} onConfirm={() => remove(e)} />
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            );
          })}
        </AnimatePresence>
        {filtered.length === 0 && <p className="text-muted-foreground col-span-full text-center py-12">Sin eventos para los filtros seleccionados.</p>}
      </div>

      {/* CREATE / EDIT */}
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-w-3xl max-h-[92vh] overflow-y-auto">
          <DialogHeader><DialogTitle>{editing?.id ? "Editar evento" : "Agendar nuevo evento"}</DialogTitle></DialogHeader>
          {editing && (
            <div className="grid sm:grid-cols-2 gap-3">
              <div className="sm:col-span-2"><Label>Título *</Label><Input value={editing.title} onChange={(e) => setEditing({ ...editing, title: e.target.value })} /></div>
              <div className="sm:col-span-2"><Label>Descripción</Label><Textarea rows={2} value={editing.description} onChange={(e) => setEditing({ ...editing, description: e.target.value })} /></div>
              <div className="sm:col-span-2"><Label>Dirección / Ubicación *</Label><Input value={editing.address} onChange={(e) => setEditing({ ...editing, address: e.target.value })} /></div>
              <div><Label>Contacto del evento (opcional)</Label><Input value={editing.contactPhone ?? ""} onChange={(e) => setEditing({ ...editing, contactPhone: e.target.value })} /></div>
              <div><Label>Fecha *</Label><Input type="date" value={editing.date} onChange={(e) => setEditing({ ...editing, date: e.target.value })} /></div>
              <div><Label>Hora inicio</Label><Input type="time" value={editing.startTime} onChange={(e) => setEditing({ ...editing, startTime: e.target.value })} /></div>
              <div><Label>Hora fin</Label><Input type="time" value={editing.endTime} onChange={(e) => setEditing({ ...editing, endTime: e.target.value })} /></div>

              <div>
                <Label>Plan *</Label>
                <Select value={editing.planId} onValueChange={(v) => setEditing({ ...editing, planId: v, selectedExtraId: null })}>
                  <SelectTrigger><SelectValue /></SelectTrigger>
                  <SelectContent>{plans.map((p) => <SelectItem key={p.id} value={p.id}>{p.name} · {fmtCOP(p.basePrice)}</SelectItem>)}</SelectContent>
                </Select>
              </div>
              <div>
                <Label>Valor extra del plan</Label>
                <Select value={editing.selectedExtraId ?? "none"} onValueChange={(v) => setEditing({ ...editing, selectedExtraId: v === "none" ? null : v })}>
                  <SelectTrigger><SelectValue placeholder="Solo precio base" /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="none">Solo precio base</SelectItem>
                    {(plans.find((p) => p.id === editing.planId)?.extras ?? []).map((x) => (
                      <SelectItem key={x.id} value={x.id}>+ {fmtCOP(x.amount)} — {x.reason}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="sm:col-span-2">
                <Label>Cliente *</Label>
                <Select value={editing.clientId} onValueChange={(v) => setEditing({ ...editing, clientId: v })}>
                  <SelectTrigger><SelectValue /></SelectTrigger>
                  <SelectContent>{clients.map((c) => <SelectItem key={c.id} value={c.id}>{c.name}</SelectItem>)}</SelectContent>
                </Select>
              </div>

              <div className="sm:col-span-2">
                <Label>Recreadores asignados * <span className="text-xs text-muted-foreground">(solo activos)</span></Label>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 mt-1.5">
                  {activeRecreators.map((r) => {
                    const checked = editing.recreatorIds.includes(r.id);
                    return (
                      <label key={r.id} className={`flex items-center gap-2 p-2 rounded border cursor-pointer text-sm ${checked ? "border-[#F23545] bg-red-50" : "hover:bg-muted"}`}>
                        <Checkbox checked={checked} onCheckedChange={(c) => {
                          setEditing({ ...editing, recreatorIds: c ? [...editing.recreatorIds, r.id] : editing.recreatorIds.filter((x) => x !== r.id) });
                        }} />
                        {r.fullName}
                      </label>
                    );
                  })}
                </div>
              </div>

              <div className="sm:col-span-2">
                <Label>Plantilla de material (opcional)</Label>
                <Select value={materialTpl} onValueChange={applyTemplate}>
                  <SelectTrigger><SelectValue placeholder="Sin plantilla" /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="none">Sin plantilla</SelectItem>
                    {materials.map((m) => <SelectItem key={m.id} value={m.id}>{m.name}</SelectItem>)}
                  </SelectContent>
                </Select>
                <div className="mt-2 space-y-1">
                  {editing.checklist.map((c) => (
                    <div key={c.id} className="flex items-center gap-2 text-sm bg-muted/50 rounded px-2 py-1">
                      <span className="flex-1">{c.label}</span>
                      <WithTooltip label="Quitar ítem del checklist">
                        <button type="button" onClick={() => setEditing({ ...editing, checklist: editing.checklist.filter((x) => x.id !== c.id) })} aria-label="Quitar ítem"><X className="size-3" /></button>
                      </WithTooltip>
                    </div>
                  ))}
                  <div className="flex gap-2 mt-1">
                    <Input value={newCheck} onChange={(e) => setNewCheck(e.target.value)} placeholder="Agregar ítem extra" onKeyDown={(e) => {
                      if (e.key === "Enter" && newCheck.trim()) { e.preventDefault(); setEditing({ ...editing, checklist: [...editing.checklist, { id: newId("ch"), label: newCheck.trim(), done: false }] }); setNewCheck(""); }
                    }} />
                    <Button type="button" variant="outline" onClick={() => {
                      if (newCheck.trim()) { setEditing({ ...editing, checklist: [...editing.checklist, { id: newId("ch"), label: newCheck.trim(), done: false }] }); setNewCheck(""); }
                    }}>Agregar</Button>
                  </div>
                </div>
              </div>

              <div><Label>Costo transporte</Label><NumberInput value={editing.transportCost} onChange={(v) => setEditing({ ...editing, transportCost: v ?? 0 })} min={0} /></div>
              <div><Label>Gastos en material</Label><NumberInput value={editing.materialCost} onChange={(v) => setEditing({ ...editing, materialCost: v ?? 0 })} min={0} /></div>

              <div className="sm:col-span-2 rounded-lg border-2 border-dashed border-[#6BBF54] p-3 bg-emerald-50/40 text-sm">
                <span className="text-muted-foreground">Utilidad estimada: </span>
                <strong className="text-[#6BBF54]">{fmtCOP(computeUtility(editing))}</strong>
              </div>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setOpen(false)}>Cancelar</Button>
            <Button onClick={save} className="bg-[#F23545] hover:bg-[#d92a39]">Guardar</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* PREVIEW */}
      <Dialog open={!!preview} onOpenChange={(o) => !o && setPreview(null)}>
        <DialogContent>
          <DialogHeader><DialogTitle>{preview?.title}</DialogTitle></DialogHeader>
          {preview && (
            <div className="text-sm space-y-2">
              <div className="flex gap-2"><Badge>{plans.find((p) => p.id === preview.planId)?.name}</Badge><Badge variant="outline">{fmtDate(preview.date)}</Badge></div>
              <p className="text-muted-foreground">{preview.description}</p>
              <div className="flex items-center gap-1"><MapPin className="size-3.5" /> {preview.address}</div>
              <div className="flex items-center gap-1"><Users className="size-3.5" /> {preview.recreatorIds.length} recreador(es)</div>
              <div className="font-medium text-[#6BBF54]">Utilidad: {fmtCOP(computeUtility(preview))}</div>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setPreview(null)}>Cerrar</Button>
            {preview && (
              <Button asChild className="bg-[#F23545] hover:bg-[#d92a39]">
                <Link to={`/admin/agenda/${preview.id}`}>Ver al detalle</Link>
              </Button>
            )}
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
