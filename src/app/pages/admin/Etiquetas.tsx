import { useState } from "react";
import { useApp, newId } from "../../lib/store";
import type { Tag } from "../../lib/types";
import { PageHeader } from "../../components/common/PageHeader";
import { DataTable } from "../../components/common/DataTable";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { Label } from "../../components/ui/label";
import { Textarea } from "../../components/ui/textarea";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "../../components/ui/dialog";
import { Tags as TagsIcon, Plus } from "lucide-react";
import { Badge } from "../../components/ui/badge";
import { toast } from "sonner";

export function EtiquetasPage() {
  const { tags, setState } = useApp();
  const [editing, setEditing] = useState<Tag | null>(null);
  const [preview, setPreview] = useState<Tag | null>(null);
  const [open, setOpen] = useState(false);

  const openCreate = () => { setEditing({ id: "", name: "", color: "#F23545", description: "" }); setOpen(true); };
  const openEdit = (t: Tag) => { setEditing({ ...t }); setOpen(true); };

  const save = () => {
    if (!editing) return;
    if (!editing.name.trim()) { toast.error("El nombre es requerido."); return; }
    setState((s) => {
      const exists = s.tags.find((x) => x.id === editing.id);
      const tags = exists
        ? s.tags.map((x) => (x.id === editing.id ? editing : x))
        : [...s.tags, { ...editing, id: newId("t") }];
      return { ...s, tags };
    });
    toast.success(editing.id ? "Etiqueta actualizada." : "Etiqueta creada.");
    setOpen(false); setEditing(null);
  };

  const remove = (t: Tag) => {
    setState((s) => ({
      ...s,
      tags: s.tags.filter((x) => x.id !== t.id),
      recreators: s.recreators.map((r) => (r.tagId === t.id ? { ...r, tagId: null } : r)),
    }));
    toast.success("Etiqueta eliminada. Recreadores afectados quedaron como 'Sin etiqueta'.");
  };

  return (
    <>
      <PageHeader
        title="Etiquetas" subtitle="Clasifica a tu equipo y materiales con etiquetas reutilizables." icon={<TagsIcon className="size-5" />}
        actions={<Button onClick={openCreate} className="bg-[#F23545] hover:bg-[#d92a39]"><Plus className="size-4 mr-1" /> Nueva etiqueta</Button>}
      />

      <DataTable
        rows={tags}
        searchKeys={["name", "description"]}
        getLabel={(t) => t.name}
        columns={[
          { key: "color", header: "", render: (t) => <span className="inline-block size-4 rounded-full" style={{ background: t.color }} /> },
          { key: "name", header: "Nombre", render: (t) => <span className="font-medium">{t.name}</span> },
          { key: "description", header: "Descripción", render: (t) => <span className="text-sm text-muted-foreground line-clamp-1">{t.description ?? "—"}</span> },
        ]}
        onView={setPreview}
        onPreview={setPreview}
        onEdit={openEdit}
        onDelete={remove}
      />

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent>
          <DialogHeader><DialogTitle>{editing?.id ? "Editar etiqueta" : "Nueva etiqueta"}</DialogTitle></DialogHeader>
          {editing && (
            <div className="space-y-3">
              <div><Label>Nombre</Label><Input value={editing.name} onChange={(e) => setEditing({ ...editing, name: e.target.value })} /></div>
              <div><Label>Color</Label><Input type="color" value={editing.color} onChange={(e) => setEditing({ ...editing, color: e.target.value })} className="h-10 w-24 p-1" /></div>
              <div><Label>Descripción</Label><Textarea value={editing.description ?? ""} onChange={(e) => setEditing({ ...editing, description: e.target.value })} /></div>
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
          <DialogHeader><DialogTitle>Vista rápida · {preview?.name}</DialogTitle></DialogHeader>
          {preview && (
            <div className="space-y-2">
              <Badge style={{ background: preview.color }}>{preview.name}</Badge>
              <p className="text-sm text-muted-foreground">{preview.description ?? "Sin descripción."}</p>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setPreview(null)}>Cerrar</Button>
            <Button onClick={() => { if (preview) { openEdit(preview); setPreview(null); } }} className="bg-[#F23545] hover:bg-[#d92a39]">Ver al detalle</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
