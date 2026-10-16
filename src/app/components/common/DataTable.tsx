import { useMemo, useState } from "react";
import { Input } from "../ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../ui/table";
import { Button } from "../ui/button";
import { Search, Eye, Pencil, FileSearch, ChevronLeft, ChevronRight } from "lucide-react";
import { ConfirmDelete } from "./ConfirmDelete";
import { motion, AnimatePresence } from "motion/react";

export interface Column<T> {
  key: string;
  header: string;
  render: (row: T) => React.ReactNode;
  className?: string;
}

interface Props<T> {
  rows: T[];
  columns: Column<T>[];
  searchPlaceholder?: string;
  searchKeys: (keyof T | ((r: T) => string))[];
  getLabel: (r: T) => string;
  onView?: (r: T) => void;
  onPreview?: (r: T) => void;
  onEdit?: (r: T) => void;
  onDelete?: (r: T) => void;
  pageSize?: number;
  emptyMessage?: string;
}

export function DataTable<T extends { id: string }>({
  rows, columns, searchPlaceholder = "Buscar…", searchKeys, getLabel,
  onView, onPreview, onEdit, onDelete, pageSize = 8, emptyMessage = "Sin registros.",
}: Props<T>) {
  const [q, setQ] = useState("");
  const [page, setPage] = useState(1);

  const filtered = useMemo(() => {
    if (!q.trim()) return rows;
    const needle = q.toLowerCase();
    return rows.filter((r) =>
      searchKeys.some((k) => {
        const v = typeof k === "function" ? (k as any)(r) : (r as any)[k];
        return String(v ?? "").toLowerCase().includes(needle);
      }),
    );
  }, [rows, q, searchKeys]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / pageSize));
  const safePage = Math.min(page, totalPages);
  const slice = filtered.slice((safePage - 1) * pageSize, safePage * pageSize);

  return (
    <div className="space-y-3">
      <div className="flex items-center gap-2">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-2.5 top-2.5 size-4 text-muted-foreground" />
          <Input value={q} onChange={(e) => { setQ(e.target.value); setPage(1); }} placeholder={searchPlaceholder} className="pl-8" />
        </div>
        <span className="text-xs text-muted-foreground ml-auto">{filtered.length} registro(s)</span>
      </div>

      <div className="rounded-lg border bg-card overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow className="bg-muted/50">
              {columns.map((c) => (
                <TableHead key={c.key} className={c.className}>{c.header}</TableHead>
              ))}
              {(onView || onPreview || onEdit || onDelete) && (
                <TableHead className="text-right w-[180px]">Acciones</TableHead>
              )}
            </TableRow>
          </TableHeader>
          <TableBody>
            <AnimatePresence initial={false}>
              {slice.length === 0 && (
                <TableRow>
                  <TableCell colSpan={columns.length + 1} className="text-center text-muted-foreground py-10">{emptyMessage}</TableCell>
                </TableRow>
              )}
              {slice.map((r) => (
                <motion.tr
                  key={r.id}
                  initial={{ opacity: 0, y: 4 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  className="border-b last:border-0 hover:bg-muted/30 transition-colors"
                >
                  {columns.map((c) => (
                    <td key={c.key} className={`p-2 align-middle ${c.className ?? ""}`}>{c.render(r)}</td>
                  ))}
                  {(onView || onPreview || onEdit || onDelete) && (
                    <td className="p-2 text-right">
                      <div className="inline-flex gap-1">
                        {onView && (
                          <Button variant="ghost" size="icon" aria-label="Ver al detalle" onClick={() => onView(r)} className="hover:bg-amber-50 hover:text-amber-700">
                            <FileSearch className="size-4" />
                          </Button>
                        )}
                        {onPreview && (
                          <Button variant="ghost" size="icon" aria-label="Previsualizar" onClick={() => onPreview(r)} className="hover:bg-sky-50 hover:text-sky-700">
                            <Eye className="size-4" />
                          </Button>
                        )}
                        {onEdit && (
                          <Button variant="ghost" size="icon" aria-label="Editar" onClick={() => onEdit(r)} className="hover:bg-emerald-50 hover:text-emerald-700">
                            <Pencil className="size-4" />
                          </Button>
                        )}
                        {onDelete && (
                          <ConfirmDelete itemLabel={getLabel(r)} onConfirm={() => onDelete(r)} />
                        )}
                      </div>
                    </td>
                  )}
                </motion.tr>
              ))}
            </AnimatePresence>
          </TableBody>
        </Table>
      </div>

      <div className="flex items-center justify-end gap-2 text-sm">
        <span className="text-muted-foreground">Página {safePage} de {totalPages}</span>
        <Button variant="outline" size="icon" disabled={safePage <= 1} onClick={() => setPage(safePage - 1)} aria-label="Anterior"><ChevronLeft className="size-4" /></Button>
        <Button variant="outline" size="icon" disabled={safePage >= totalPages} onClick={() => setPage(safePage + 1)} aria-label="Siguiente"><ChevronRight className="size-4" /></Button>
      </div>
    </div>
  );
}
