import { useState } from "react";
import { Link, useParams, useNavigate } from "react-router";
import { useApp } from "../../lib/store";
import { Button } from "../../components/ui/button";
import { Card, CardContent } from "../../components/ui/card";
import { Badge } from "../../components/ui/badge";
import { Checkbox } from "../../components/ui/checkbox";
import { Textarea } from "../../components/ui/textarea";
import { Label } from "../../components/ui/label";
import { NumberInput } from "../../components/common/NumberInput";
import { ArrowLeft, MapPin, Phone, Star, Calendar as CalIcon, Download, Users } from "lucide-react";
import { fmtCOP, fmtDate, googleCalendarLink, downloadHtmlAsPdf } from "../../lib/helpers";
import { toast } from "sonner";
import { WithTooltip } from "../../components/common/WithTooltip";

export function AgendaDetailPage() {
  const { id } = useParams<{ id: string }>();
  const nav = useNavigate();
  const { events, plans, clients, recreators, setState, computeUtility } = useApp();
  const event = events.find((e) => e.id === id);

  const [ratingDraft, setRatingDraft] = useState<number>(event?.rating ?? 0);
  const [commentDraft, setCommentDraft] = useState<string>(event?.ratingComment ?? "");

  if (!event) {
    return (
      <div className="text-center py-20">
        <p className="text-muted-foreground">Evento no encontrado.</p>
        <Button asChild variant="outline" className="mt-4"><Link to="/admin/agenda"><ArrowLeft className="size-4 mr-1" /> Volver a la agenda</Link></Button>
      </div>
    );
  }

  const plan = plans.find((p) => p.id === event.planId);
  const client = clients.find((c) => c.id === event.clientId);
  const recs = event.recreatorIds.map((rid) => recreators.find((r) => r.id === rid)).filter(Boolean) as NonNullable<ReturnType<typeof recreators.find>>[];
  const extra = plan?.extras.find((x) => x.id === event.selectedExtraId);
  const base = (plan?.basePrice ?? 0) + (extra?.amount ?? 0);
  const isPast = new Date(event.date) < new Date(new Date().toDateString());

  const updateEvent = (patch: Partial<typeof event>) => {
    setState((s) => ({
      ...s,
      events: s.events.map((e) => (e.id === event.id ? { ...e, ...patch } : e)),
    }));
  };

  const toggleCheck = (cid: string) => {
    updateEvent({ checklist: event.checklist.map((c) => (c.id === cid ? { ...c, done: !c.done } : c)) });
  };

  const saveCosts = (field: "transportCost" | "materialCost", v: number | undefined) => {
    updateEvent({ [field]: v ?? 0 } as Partial<typeof event>);
  };

  const saveRating = () => {
    updateEvent({ rating: ratingDraft, ratingComment: commentDraft });
    toast.success("Calificación guardada.");
  };

  const calLink = () => {
    const recsStr = recs.map((r) => r.fullName).join(" y ");
    return googleCalendarLink({
      title: `${event.title} — Total Recreación`,
      date: event.date, start: event.startTime, end: event.endTime,
      description: `Plan: ${plan?.name ?? ""}. ${event.description}. Cliente: ${client?.name ?? ""}. Recreadores: ${recsStr}.`,
      location: event.address,
    });
  };

  const downloadPdf = () => {
    const html = `
      <div class="brand"><h1>Total Recreación · ${event.title}</h1></div>
      <div class="meta">Generado ${new Date().toLocaleString("es-CO")} · <span class="badge">${plan?.name ?? ""}</span></div>
      <div class="grid">
        <div class="card"><div class="label">Fecha</div><div>${fmtDate(event.date)} · ${event.startTime}–${event.endTime}</div></div>
        <div class="card"><div class="label">Ubicación</div><div>${event.address}</div></div>
        <div class="card"><div class="label">Cliente</div><div>${client?.name ?? ""} (${client?.phone ?? ""})</div></div>
        <div class="card"><div class="label">Contacto del evento</div><div>${event.contactPhone || "—"}</div></div>
      </div>
      <h2>Descripción</h2><p>${event.description || "—"}</p>
      <h2>Equipo asignado</h2>
      <ul>${recs.map((r) => `<li>${r.fullName} — ${r.phone}</li>`).join("")}</ul>
      <h2>Materiales</h2>
      <table><thead><tr><th>Ítem</th><th>Estado</th></tr></thead>
      <tbody>${event.checklist.map((c) => `<tr><td>${c.label}</td><td>${c.done ? "✓ Verificado" : "Pendiente"}</td></tr>`).join("") || `<tr><td colspan=2>Sin checklist</td></tr>`}</tbody></table>
      <h2>Detalle económico</h2>
      <table>
        <tr><td>Precio base</td><td>${fmtCOP(plan?.basePrice ?? 0)}</td></tr>
        ${extra ? `<tr><td>Extra (${extra.reason})</td><td>${fmtCOP(extra.amount)}</td></tr>` : ""}
        <tr><td>Subtotal evento</td><td><strong>${fmtCOP(base)}</strong></td></tr>
        <tr><td>Sueldos recreadores</td><td>- ${fmtCOP(recs.reduce((s, r) => s + r.salary, 0))}</td></tr>
        <tr><td>Transporte</td><td>- ${fmtCOP(event.transportCost)}</td></tr>
        <tr><td>Material</td><td>- ${fmtCOP(event.materialCost)}</td></tr>
        <tr><td><strong>Utilidad estimada</strong></td><td><strong>${fmtCOP(computeUtility(event))}</strong></td></tr>
      </table>
      ${event.rating ? `<h2>Calificación</h2><p>${event.rating} / 5 — ${event.ratingComment || ""}</p>` : ""}`;
    downloadHtmlAsPdf(`Evento_${event.title}`, html);
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between gap-3 flex-wrap">
        <div>
          <Button asChild variant="ghost" size="sm" onClick={() => nav(-1)}>
            <Link to="/admin/agenda"><ArrowLeft className="size-4 mr-1" /> Volver</Link>
          </Button>
          <h1 className="text-2xl font-bold mt-1">{event.title}</h1>
          <p className="text-sm text-muted-foreground">{fmtDate(event.date)} · {event.startTime} – {event.endTime}</p>
        </div>
        <div className="flex gap-2 flex-wrap">
          <Button asChild className="bg-[#0D9BD8] hover:bg-[#0a85ba]">
            <a href={calLink()} target="_blank" rel="noreferrer"><CalIcon className="size-4 mr-1" /> Agendar en Calendar</a>
          </Button>
          <Button onClick={downloadPdf} className="bg-[#F23545] hover:bg-[#d92a39]"><Download className="size-4 mr-1" /> Descargar PDF</Button>
        </div>
      </div>

      <div className="grid sm:grid-cols-2 gap-3 text-sm">
        <Card><CardContent className="p-4 space-y-2">
          <div className="text-xs uppercase text-muted-foreground">Información</div>
          <div className="flex items-start gap-1"><MapPin className="size-3.5 mt-0.5" /> {event.address}</div>
          {event.contactPhone && <div className="flex items-center gap-1"><Phone className="size-3.5" /> {event.contactPhone}</div>}
          <p className="text-muted-foreground">{event.description || "Sin descripción."}</p>
        </CardContent></Card>
        <Card><CardContent className="p-4 space-y-2">
          <div className="text-xs uppercase text-muted-foreground">Cliente</div>
          <div className="font-medium">{client?.name}</div>
          <div className="text-muted-foreground">{client?.phone} · {client?.municipality}</div>
        </CardContent></Card>
        <Card><CardContent className="p-4 space-y-2">
          <div className="text-xs uppercase text-muted-foreground">Plan</div>
          <div className="font-medium">{plan?.name}</div>
          <div>Base: {fmtCOP(plan?.basePrice ?? 0)} {extra && <span>· Extra ({extra.reason}): {fmtCOP(extra.amount)}</span>}</div>
        </CardContent></Card>
        <Card><CardContent className="p-4 space-y-2">
          <div className="text-xs uppercase text-muted-foreground">Economía</div>
          <div>Subtotal evento: <strong>{fmtCOP(base)}</strong></div>
          <div>Sueldos: {fmtCOP(recs.reduce((s, r) => s + r.salary, 0))}</div>
          <div className="grid grid-cols-2 gap-2 pt-1">
            <div>
              <Label className="text-xs">Transporte</Label>
              <NumberInput value={event.transportCost} onChange={(v) => saveCosts("transportCost", v)} min={0} />
            </div>
            <div>
              <Label className="text-xs">Material</Label>
              <NumberInput value={event.materialCost} onChange={(v) => saveCosts("materialCost", v)} min={0} />
            </div>
          </div>
          <div className="text-[#6BBF54] font-semibold pt-1">Utilidad: {fmtCOP(computeUtility(event))}</div>
        </CardContent></Card>
      </div>

      <Card><CardContent className="p-4">
        <div className="flex items-center gap-2 mb-2"><Users className="size-4" /><span className="text-xs uppercase text-muted-foreground">Equipo</span></div>
        <div className="flex flex-wrap gap-2">
          {recs.map((r) => <Badge key={r.id} variant="secondary">{r.fullName}</Badge>)}
          {recs.length === 0 && <span className="text-sm text-muted-foreground">Sin recreadores asignados.</span>}
        </div>
      </CardContent></Card>

      <Card><CardContent className="p-4">
        <div className="flex items-center justify-between mb-2">
          <div className="text-xs uppercase text-muted-foreground">Checklist de materiales</div>
          <span className="text-xs text-muted-foreground">{event.checklist.filter((c) => c.done).length}/{event.checklist.length}</span>
        </div>
        <div className="space-y-1">
          {event.checklist.map((c) => (
            <label key={c.id} className="flex items-center gap-2 text-sm p-1.5 rounded hover:bg-muted cursor-pointer">
              <Checkbox checked={c.done} onCheckedChange={() => toggleCheck(c.id)} />
              <span className={c.done ? "line-through text-muted-foreground" : ""}>{c.label}</span>
            </label>
          ))}
          {event.checklist.length === 0 && <p className="text-xs text-muted-foreground">Sin checklist registrado.</p>}
        </div>
      </CardContent></Card>

      {isPast && (
        <Card className="border-amber-200 bg-amber-50/40"><CardContent className="p-4">
          <div className="text-xs uppercase text-muted-foreground mb-2">Calificación post-evento</div>
          <div className="flex items-center gap-1">
            {[1, 2, 3, 4, 5].map((n) => (
              <WithTooltip key={n} label={`Calificar con ${n} de 5 estrellas`}>
                <button type="button" onClick={() => setRatingDraft(n)} aria-label={`${n} estrellas`}>
                  <Star className={`size-6 ${n <= ratingDraft ? "fill-[#F2E313] text-[#F2E313]" : "text-muted-foreground"}`} />
                </button>
              </WithTooltip>
            ))}
          </div>
          <Textarea className="mt-2" rows={2} value={commentDraft} onChange={(e) => setCommentDraft(e.target.value)} placeholder="Comentario del cliente (opcional)" />
          <Button className="mt-2 bg-[#6BBF54] hover:bg-[#5fae4a]" onClick={saveRating}>Guardar calificación</Button>
        </CardContent></Card>
      )}
    </div>
  );
}
