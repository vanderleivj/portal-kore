"use client";

import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { StatusTimeline, Step } from "./status-timeline";
import { Loader2 } from "lucide-react";

interface DrawerDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  steps: Step[];
  isLoading?: boolean;
  orderIdNumber: string | null;
}

export function DrawerDialog({
  open,
  onOpenChange,
  steps,
  isLoading = false,
  orderIdNumber,
}: DrawerDialogProps) {
  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent
        side="right"
        className="w-[400px] sm:w-[540px] overflow-y-auto"
      >
        {isLoading ? (
          <div className="flex items-center justify-center h-64">
            <Loader2 className="size-8 animate-spin" />
          </div>
        ) : (
          <>
            <SheetHeader>
              <SheetTitle>Status do pedido</SheetTitle>
              <SheetDescription>Nº # {orderIdNumber}</SheetDescription>
            </SheetHeader>
            <StatusTimeline steps={steps} />
          </>
        )}
      </SheetContent>
    </Sheet>
  );
}
