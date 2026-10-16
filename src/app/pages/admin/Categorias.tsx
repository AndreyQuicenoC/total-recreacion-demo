import { useState } from "react";
import { useApp, newId } from "../../lib/store";
import type { Category } from "../../lib/types";
import { PageHeader } from "../../components/common/PageHeader";
import { DataTable } from "../../components/common/DataTable";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { Label } from "../../components/ui/label";
import { Textarea } from "../../components/ui/textarea";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "../../components/ui/dialog";
import { FolderKanban, Plus } from "lucide-react";
import { toast } from "sonner";

const empty: Category = { id: "", name: "", description: "", color: "#F23545" };

export function CategoriasPage() {
  const { categories, plans, setState } = useApp();
  const [editing, setEditing] = useState<Category | null>(null);
  const [preview, setPreview] = useState<Category | null>(null);
  const [open, setOpen] = useState(false);

  const openCreate = () => { setEditing({ ...empty }); setOpen(true); };
  const openEdit = (c: Category) => { setEditing({ ...c }); setOpen(true); };

  const save = () => {
    if (!editing) return;
    if (!editing.name.trim()) { toast.error("Nombre requerido."); return; }
    setState((s) => {
      const exists = s.categories.find((x) => x.id === editing.id);
      const categories = exists ? s.categories.map((x) => x.id === editing.id ? editing : x) : [...s.categories, { ...editing, id: newId("cat") }];
      return { ...s, categories };
    });
    toast.success(editing.id ? "Categoría actualizada." : "Categoría creada.");
    setOpen(false); setEditing(null);
  };

  const remove = (c: Category) => {
    const used = plans.filter((p) => p.categoryId === c.id);
    if (used.length) { toast.error(`No se puede eliminar: ${used.length} plan(es) usan esta categoría.`); return; }
    setState((s) => ({ ...s, categories: s.categories.filter((x) => x.id !== c.id) }));
    toast.success("Categoría eliminada.");
  };

  return (
    <>
      <PageHeader title="Categorías de planes" subtitle="Cada categoría genera un carrusel en el inicio público." icon={<FolderKanban className="size-5" />}
        actions={<Button onClick={openCreate} className="bg-[#F23545] hover:bg-[#d92a39]"><Plus className="size-4 mr-1" /> Nueva categoría</Button>}
      />

      <DataTable
        rows={categories}
        searchKeys={["name", "description"]}
        getLabel={(c) => c.name}
        columns={[
          { key: "color", header: "", render: (c) => <span className="inline-block size-4 rounded-full" style={{ background: c.color }} /> },
          { key: "name", header: "Nombre", render: (c) => <span className="font-medium">{c.name}</span> },
          { key: "desc", header: "Descripción", render: (c) => <span className="text-sm text-muted-foreground line-clamp-1">{c.description}</span> },
          { key: "plans", header: "# planes", render: (c) => plans.filter((p) => p.categoryId === c.id).length },
        ]}
        onView={setPreview}
        onPreview={setPreview}
        onEdit={openEdit}
        onDelete={remove}
      />

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent>
          <DialogHeader><DialogTitle>{editing?.id ? "Editar categoría" : "Nueva categoría"}</DialogTitle></DialogHeader>
          {editing && (
            <div className="space-y-3">
              <div><Label>Nombre</Label><Input value={editing.name} onChange={(e) => setEditing({ ...editing, name: e.target.value })} /></div>
              <div><Label>Color del carrusel</Label><Input type="color" value={editing.color ?? "#F23545"} onChange={(e) => setEditing({ ...editing, color: e.target.value })} className="h-10 w-24 p-1" /></div>
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
          <DialogHeader><DialogTitle>{preview?.name}</DialogTitle></DialogHeader>
          {preview && (
            <>
              <p className="text-sm text-muted-foreground">{preview.description}</p>
              <div className="text-sm"><strong>Planes asociados:</strong> {plans.filter((p) => p.categoryId === preview.id).length}</div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
}
