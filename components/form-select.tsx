import * as React from "react";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";

export function SelectScrollable({
  className,
  placeholder,
}: {
  className?: string;
  placeholder?: string;
}) {
  return (
    <Select>
      <SelectTrigger
        className={cn(
          className,
          "bg-white",
          "w-full max-w-[180px] text-primary-color text-xs border-[#E0E0E0]"
        )}
      >
        <SelectValue className="bg-white" placeholder={placeholder} />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="est">Eastern Standard Time (EST)</SelectItem>
        <SelectItem value="cst">Central Standard Time (CST)</SelectItem>
        <SelectItem value="mst">Mountain Standard Time (MST)</SelectItem>
        <SelectItem value="pst">Pacific Standard Time (PST)</SelectItem>
        <SelectItem value="akst">Alaska Standard Time (AKST)</SelectItem>
        <SelectItem value="hst">Hawaii Standard Time (HST)</SelectItem>
      </SelectContent>
    </Select>
  );
}
