import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { StatusTimeline } from "./status-timeline";

export function DrawerDialog({
  open,
  onOpenChange,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}) {
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
        <StatusTimeline />
      </DialogContent>
    </Dialog>
  );
}
