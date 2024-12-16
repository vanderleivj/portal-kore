import { SelectScrollable } from "@/components/form-select";
import { MainTable } from "@/components/main-table";
import { DatePickerWithRange } from "@/components/ui/date-range-picker";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

export default function Home() {
  return (
    <div className="flex flex-col gap-8">
      <div className="flex justify-between items-center ">
        <h1 className="text-2xl font-medium text-primary-color">
          Lista de pedidos
        </h1>
        <DatePickerWithRange />
      </div>
      <div className="flex w-full flex-row justify-between gap-2">
        <SelectScrollable placeholder="Selecione um cliente" />
        <SelectScrollable placeholder="Selecione um vendedor" />
        <SelectScrollable placeholder="Selecione um segmento" />
        <SelectScrollable placeholder="Selecione um status" />
        <SelectScrollable placeholder="Selecione uma região" />
        <SelectScrollable placeholder="Selecione uma transportadora" />
      </div>
      <MainTable />
      <Pagination>
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious href="#" />
          </PaginationItem>
          <PaginationItem>
            <PaginationLink href="#">1</PaginationLink>
          </PaginationItem>
          <PaginationItem>
            <PaginationLink href="#" isActive>
              2
            </PaginationLink>
          </PaginationItem>
          <PaginationItem>
            <PaginationLink href="#">3</PaginationLink>
          </PaginationItem>
          <PaginationItem>
            <PaginationEllipsis />
          </PaginationItem>
          <PaginationItem>
            <PaginationNext href="#" />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  );
}
