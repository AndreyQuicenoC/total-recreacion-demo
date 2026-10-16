import { useState } from "react";
import { useApp, newId } from "../../lib/store";
import type { Client } from "../../lib/types";
import { PageHeader } from "../../components/common/PageHeader";
import { DataTable } from "../../components/common/DataTable";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { Label } from "../../components/ui/label";
import { Textarea } from "../../components/ui/textarea";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "../../components/ui/dialog";
import { Contact, Plus, MessageCircle } from "lucide-react";
import { toast } from "sonner";
import { whatsappLink } from "../../lib/helpers";

const empty: Client = { id: "", name: "", phone: "", municipality: "", email: "", address: "", documentId: "", description: "" };

export function ClientesPage() {
  const { clients, setState } = useApp();
  const [editing, setEditing] = useState<Client | null>(null);
  const [preview, setPreview] = useState<Client | null>(null);
  const [detail, setDetail] = useState<Client | null>(null);
  const [open, setOpen] = useState(false);

  const openCreate = () => { setEditing({ ...empty }); setOpen(true); };
  const openEdit = (c: Client) => { setEditing({ ...c }); setOpen(true); };

  const save = () => {
    if (!editing) return;
    if (!editing.name.trim() || !editing.phone.trim() || !editing.municipality.trim()) { toast.error("Nombre, teléfono y municipio son requeridos."); return; }
    setState((s) => {
      const exists = s.clients.find((x) => x.id === editing.id);
      const clients = exists ? s.clients.map((x) => x.id === editing.id ? editing : x) : [...s.clients, { ...editing, id: newId("c") }];
      return { ...s, clients };
    });
    toast.success(editing.id ? "Cliente actualizado." : "Cliente creado.");
    setOpen(false); setEditing(null);
  };

  const remove = (c: Client) => {
    setState((s) => ({ ...s, clients: s.clients.filter((x) => x.id !== c.id) }));
    toast.success("Cliente eliminado.");
  };

  return (
    <>
      <PageHeader title="Clientes" subtitle="Perfila a quienes confían en Total Recreación." icon={<Contact className="size-5" />}
        actions={<Button onClick={openCreate} className="bg-[#F23545] hover:bg-[#d92a39]"><Plus className="size-4 mr-1" /> Nuevo cliente</Button>}
      />

      <DataTable
        rows={clients}
        searchKeys={["name", "phone", "municipality", "email", "documentId"]}
        searchPlaceholder="Buscar por nombre, teléfono, municipio…"
        getLabel={(c) => c.name}
        columns={[
          { key: "name", header: "Nombre", render: (c) => <span className="font-medium">{c.name}</span> },
          { key: "phone", header: "Teléfono", render: (c) => c.phone },
          { key: "muni", header: "Municipio", render: (c) => c.municipality },
          { key: "email", header: "Correo", render: (c) => <span className="text-sm text-muted-foreground">{c.email || "—"}</span> },
          { key: "wa", header: "WhatsApp", render: (c) => (
            <Button asChild size="icon" variant="ghost" className="text-[#25D366] hover:bg-emerald-50" aria-label="Abrir WhatsApp">
              <a href={whatsappLink(`Hola ${c.name}, te escribo de Total Recreación.`, c.phone)} target="_blank" rel="noreferrer">
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
          <DialogHeader><DialogTitle>{editing?.id ? "Editar cliente" : "Nuevo cliente"}</DialogTitle></DialogHeader>
          {editing && (
            <div className="grid sm:grid-cols-2 gap-3">
              <div className="sm:col-span-2"><Label>Nombre *</Label><Input value={editing.name} onChange={(e) => setEditing({ ...editing, name: e.target.value })} /></div>
              <div><Label>Teléfono *</Label><Input value={editing.phone} onChange={(e) => setEditing({ ...editing, phone: e.target.value })} /></div>
              <div><Label>Municipio *</Label><Input value={editing.municipality} onChange={(e) => setEditing({ ...editing, municipality: e.target.value })} /></div>
              <div><Label>Correo (opcional)</Label><Input type="email" value={editing.email ?? ""} onChange={(e) => setEditing({ ...editing, email: e.target.value })} /></div>
              <div><Label>Cédula (opcional)</Label><Input value={editing.documentId ?? ""} onChange={(e) => setEditing({ ...editing, documentId: e.target.value })} /></div>
              <div className="sm:col-span-2"><Label>Dirección (opcional)</Label><Input value={editing.address ?? ""} onChange={(e) => setEditing({ ...editing, address: e.target.value })} /></div>
              <div className="sm:col-span-2"><Label>Descripción / preferencias</Label><Textarea rows={4} value={editing.description ?? ""} onChange={(e) => setEditing({ ...editing, description: e.target.value })} /></div>
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
            <div className="text-sm space-y-1">
              <div><strong>{preview.phone}</strong> · {preview.municipality}</div>
              <div className="text-muted-foreground line-clamp-3">{preview.description || "Sin descripción."}</div>
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
          <DialogHeader><DialogTitle>{detail?.name}</DialogTitle></DialogHeader>
          {detail && (
            <div className="space-y-2 text-sm">
              <div className="grid grid-cols-2 gap-3">
                {Object.entries({ Teléfono: detail.phone, Municipio: detail.municipality, Correo: detail.email || "—", Cédula: detail.documentId || "—", Dirección: detail.address || "—" }).map(([k, v]) => (
                  <div key={k}><div className="text-xs uppercase text-muted-foreground">{k}</div><div className="font-medium">{v}</div></div>
                ))}
              </div>
              <div>
                <div className="text-xs uppercase text-muted-foreground mt-2">Descripción</div>
                <p className="text-sm">{detail.description || "Sin descripción."}</p>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
}
