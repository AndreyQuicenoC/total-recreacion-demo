import { useState } from "react";
import { useApp, newId } from "../../lib/store";
import type { MaterialTemplate } from "../../lib/types";
import { PageHeader } from "../../components/common/PageHeader";
import { DataTable } from "../../components/common/DataTable";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { Label } from "../../components/ui/label";
import { Textarea } from "../../components/ui/textarea";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "../../components/ui/dialog";
import { Badge } from "../../components/ui/badge";
import { Boxes, Plus, X } from "lucide-react";
import { toast } from "sonner";
import { WithTooltip } from "../../components/common/WithTooltip";

const empty: MaterialTemplate = { id: "", name: "", description: "", items: [] };

export function MaterialPage() {
  const { materials, setState } = useApp();
  const [editing, setEditing] = useState<MaterialTemplate | null>(null);
  const [preview, setPreview] = useState<MaterialTemplate | null>(null);
  const [detail, setDetail] = useState<MaterialTemplate | null>(null);
  const [open, setOpen] = useState(false);
  const [item, setItem] = useState("");

  const openCreate = () => { setEditing({ ...empty }); setOpen(true); };
  const openEdit = (m: MaterialTemplate) => { setEditing({ ...m, items: [...m.items] }); setOpen(true); };

  const save = () => {
    if (!editing) return;
    if (!editing.name.trim()) { toast.error("Nombre requerido."); return; }
    setState((s) => {
      const exists = s.materials.find((x) => x.id === editing.id);
      const materials = exists ? s.materials.map((x) => x.id === editing.id ? editing : x) : [...s.materials, { ...editing, id: newId("m") }];
      return { ...s, materials };
    });
    toast.success(editing.id ? "Material actualizado." : "Material creado.");
    setOpen(false); setEditing(null); setItem("");
  };

  const remove = (m: MaterialTemplate) => {
    setState((s) => ({ ...s, materials: s.materials.filter((x) => x.id !== m.id) }));
    toast.success("Plantilla de material eliminada.");
  };

  return (
    <>
      <PageHeader title="Material" subtitle="Plantillas de listas de materiales para agilizar la agenda." icon={<Boxes className="size-5" />}
        actions={<Button onClick={openCreate} className="bg-[#F23545] hover:bg-[#d92a39]"><Plus className="size-4 mr-1" /> Nueva plantilla</Button>}
      />

      <DataTable
        rows={materials}
        searchKeys={["name", "description"]}
        getLabel={(m) => m.name}
        columns={[
          { key: "name", header: "Nombre", render: (m) => <span className="font-medium">{m.name}</span> },
          { key: "items", header: "Ítems", render: (m) => m.items.length },
          { key: "desc", header: "Descripción", render: (m) => <span className="text-sm text-muted-foreground line-clamp-1">{m.description || "—"}</span> },
        ]}
        onView={setDetail}
        onPreview={setPreview}
        onEdit={openEdit}
        onDelete={remove}
      />

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader><DialogTitle>{editing?.id ? "Editar plantilla" : "Nueva plantilla"}</DialogTitle></DialogHeader>
          {editing && (
            <div className="space-y-3">
              <div><Label>Nombre *</Label><Input value={editing.name} onChange={(e) => setEditing({ ...editing, name: e.target.value })} /></div>
              <div><Label>Descripción</Label><Textarea value={editing.description ?? ""} onChange={(e) => setEditing({ ...editing, description: e.target.value })} /></div>
              <div>
                <Label>Ítems</Label>
                <div className="flex gap-2 mt-1.5">
                  <Input value={item} onChange={(e) => setItem(e.target.value)} placeholder="ej. Globos de colores"
                    onKeyDown={(e) => {
                      if (e.key === "Enter" && item.trim()) { e.preventDefault(); setEditing({ ...editing, items: [...editing.items, { id: newId("mi"), label: item.trim() }] }); setItem(""); }
                    }} />
                  <Button type="button" variant="outline" onClick={() => {
                    if (item.trim()) { setEditing({ ...editing, items: [...editing.items, { id: newId("mi"), label: item.trim() }] }); setItem(""); }
                  }}>Agregar</Button>
                </div>
                <div className="flex flex-wrap gap-2 mt-2">
                  {editing.items.map((it) => (
                    <Badge key={it.id} variant="secondary" className="gap-1 inline-flex">
                      {it.label}
                      <WithTooltip label="Quitar ítem de material">
                        <button type="button" onClick={() => setEditing({ ...editing, items: editing.items.filter((x) => x.id !== it.id) })} aria-label="Quitar ítem"><X className="size-3" /></button>
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
          <DialogHeader><DialogTitle>{preview?.name}</DialogTitle></DialogHeader>
          {preview && (
            <div className="text-sm space-y-2">
              <p className="text-muted-foreground">{preview.description || "Sin descripción."}</p>
              <p>{preview.items.length} ítems.</p>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setPreview(null)}>Cerrar</Button>
            <Button onClick={() => { if (preview) { setDetail(preview); setPreview(null); } }} className="bg-[#F23545] hover:bg-[#d92a39]">Ver al detalle</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={!!detail} onOpenChange={(o) => !o && setDetail(null)}>
        <DialogContent>
          <DialogHeader><DialogTitle>{detail?.name}</DialogTitle></DialogHeader>
          {detail && (
            <div className="space-y-2 text-sm">
              <p className="text-muted-foreground">{detail.description}</p>
              <ul className="list-disc pl-5">{detail.items.map((it) => <li key={it.id}>{it.label}</li>)}</ul>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
}
