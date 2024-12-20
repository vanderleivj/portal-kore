import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { StatusTimeline, Step } from "./status-timeline";

interface DrawerDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  steps: Step[];
}

export function DrawerDialog({ open, onOpenChange, steps }: DrawerDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        type="Drawer"
        className="sm:max-w-[425px] h-full overflow-y-auto"
      >
        <DialogHeader>
          <DialogTitle>Status do pedido </DialogTitle>
          <DialogDescription>Nº #223124123</DialogDescription>
        </DialogHeader>
        <StatusTimeline steps={steps} />
      </DialogContent>
    </Dialog>
  );
}
