import {
  AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription,
  AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger,
} from "../ui/alert-dialog";
import { Button } from "../ui/button";
import { Trash2 } from "lucide-react";
import { WithTooltip } from "./WithTooltip";

export function ConfirmDelete({
  itemLabel, onConfirm, trigger,
}: { itemLabel: string; onConfirm: () => void; trigger?: React.ReactNode }) {
  return (
    <AlertDialog>
      <WithTooltip label={`Eliminar ${itemLabel}`}>
        <AlertDialogTrigger asChild>
          {trigger ?? (
            <Button variant="ghost" size="icon" disableTooltip aria-label={`Eliminar ${itemLabel}`} className="text-red-600 hover:bg-red-50 hover:text-red-700">
              <Trash2 className="size-4" />
            </Button>
          )}
        </AlertDialogTrigger>
      </WithTooltip>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>¿Estás seguro de eliminar?</AlertDialogTitle>
          <AlertDialogDescription>
            Se eliminará permanentemente: <span className="font-medium text-foreground">{itemLabel}</span>. Esta acción no se puede deshacer.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancelar</AlertDialogCancel>
          <AlertDialogAction onClick={onConfirm} className="bg-red-600 hover:bg-red-700">Eliminar</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
