"use client";

import React, { useState, useEffect } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "./ui/badge";
import { DrawerDialog } from "./drawer-dialog";
import { Step } from "./status-timeline";
import { Order } from "@/app/types/order";
import {
  ShoppingCart,
  Clock,
  XCircle,
  DollarSign,
  CheckCircle,
  Truck,
  FileText,
  InboxIcon,
  Search,
  Minus,
  Plus,
} from "lucide-react";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface MainTableProps {
  data: Order[];
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export function MainTable({
  data,
  currentPage,
  totalPages,
  onPageChange,
}: MainTableProps) {
  const [mounted, setMounted] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleOrderClick = (order: Order) => {
    setSelectedOrder(order);
    setIsDialogOpen(true);
  };

  const toggleRow = (index: number) => {
    setExpandedIndex(expandedIndex === index ? null : index);
  };

  if (!mounted) {
    return null;
  }

  if (!data?.length) {
    return (
      <div className="flex flex-col items-center justify-center h-64 text-gray-500 gap-4">
        <InboxIcon className="w-12 h-12" />
        <p className="text-lg">Sem pedidos para serem apresentados</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-4">
      <div className="border rounded-md">
        <div className="overflow-auto max-h-[calc(100vh-250px)]">
          <Table>
            <TableHeader className="sticky top-0 bg-white z-10">
              <TableRow>
                <TableHead className="max-w-[200px]">Nº Pedido</TableHead>
                <TableHead className="max-w-[200px]">Data Inclusão</TableHead>
                <TableHead className="max-w-[200px]">Data Entrega</TableHead>
                <TableHead className="max-w-[200px]">Reprogramação</TableHead>
                <TableHead className="max-w-[200px]">Código Produto</TableHead>
                <TableHead className="max-w-[200px]">
                  Descrição do produto
                </TableHead>
                <TableHead className="max-w-[200px]">Un. Med. 1º</TableHead>
                <TableHead className="max-w-[200px]">Un. Med. 2º</TableHead>
                <TableHead className="max-w-[200px]">
                  Ordem de Produção
                </TableHead>
                <TableHead className="max-w-[200px]">Status</TableHead>
                <TableHead className="max-w-[200px] text-center sticky right-0 bg-white after:absolute after:right-0 after:top-0 after:bottom-0 after:w-4 after:bg-white after:-z-10">
                  Ações
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {data.map((order, index) => (
                <React.Fragment key={order.OrderId + order.ProductId}>
                  <TableRow>
                    <TableCell className="max-w-[200px] h-[50px] truncate text-xs">
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <span className="block truncate">
                              {order.OrderId}
                            </span>
                          </TooltipTrigger>
                          <TooltipContent>
                            <p>{order.OrderId}</p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    </TableCell>
                    <TableCell className="max-w-[200px] h-[50px] truncate text-xs">
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <span className="block truncate">{order.Date}</span>
                          </TooltipTrigger>
                          <TooltipContent>
                            <p>{order.Date}</p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    </TableCell>
                    <TableCell className="max-w-[200px] h-[50px] truncate text-xs">
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <span className="block truncate">
                              {order.DeliveryDate}
                            </span>
                          </TooltipTrigger>
                          <TooltipContent>
                            <p>{order.DeliveryDate}</p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    </TableCell>
                    <TableCell className="max-w-[200px] h-[50px] truncate text-xs">
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <span className="block truncate">
                              {order.ReschedulingDate || "-"}
                            </span>
                          </TooltipTrigger>
                          <TooltipContent>
                            <p>{order.ReschedulingDate || "-"}</p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    </TableCell>
                    <TableCell className="max-w-[200px] h-[50px] truncate text-xs">
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <span className="block truncate">
                              {order.ProductId}
                            </span>
                          </TooltipTrigger>
                          <TooltipContent>
                            <p>{order.ProductId}</p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    </TableCell>
                    <TableCell className="max-w-[200px] h-[50px] truncate text-xs">
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <span className="block truncate">
                              {order.ProductDescription}
                            </span>
                          </TooltipTrigger>
                          <TooltipContent>
                            <p>{order.ProductDescription}</p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    </TableCell>
                    <TableCell className="max-w-[200px] h-[50px] truncate text-xs">
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <span className="block truncate">
                              {order.MeasureUnit1} {order.QuantityUnit1}
                            </span>
                          </TooltipTrigger>
                          <TooltipContent>
                            <p>
                              {order.MeasureUnit1} {order.QuantityUnit1}
                            </p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    </TableCell>
                    <TableCell className="max-w-[200px] h-[50px] truncate text-xs">
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <span className="block truncate">
                              {order.MeasureUnit2} {order.QuantityUnit2}
                            </span>
                          </TooltipTrigger>
                          <TooltipContent>
                            <p>
                              {order.MeasureUnit2} {order.QuantityUnit2}
                            </p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    </TableCell>
                    <TableCell className="max-w-[200px] h-[50px] truncate text-xs">
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <span className="block truncate">
                              {order.ProductionOrderId}
                            </span>
                          </TooltipTrigger>
                          <TooltipContent>
                            <p>{order.ProductionOrderId}</p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    </TableCell>
                    <TableCell className="max-w-[200px] h-[50px]">
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Badge
                              variant={
                                order.OrderStatus === "Nota fiscal Gerada"
                                  ? "invoiceOrder"
                                  : order.OrderStatus ===
                                    "Pedido de Venda em Aberto"
                                  ? "productionOrder"
                                  : "stockAnalysis"
                              }
                            >
                              {order.OrderStatus}
                            </Badge>
                          </TooltipTrigger>
                          <TooltipContent>
                            <p>{order.OrderStatus}</p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    </TableCell>
                    <TableCell className="max-w-[200px] h-[55px] flex justify-center gap-4 items-center sticky right-0 bg-white after:absolute after:right-0 after:top-0 after:bottom-0 after:w-4 after:bg-white after:-z-10 p-0">
                      <button onClick={() => toggleRow(index)}>
                        {expandedIndex === index ? (
                          <Minus className="size-4" />
                        ) : (
                          <Plus className="size-4" />
                        )}
                      </button>
                      <button onClick={() => handleOrderClick(order)}>
                        <Search className="size-4" />
                      </button>
                    </TableCell>
                  </TableRow>
                  {expandedIndex === index && (
                    <TableRow>
                      <TableCell colSpan={15}>
                        <div className="gap-4 flex flex-col w-full p-4">
                          <div className="flex flex-row gap-2 w-full">
                            <p className="font-thin">
                              Observações:{" "}
                              <span className="font-normal">
                                {order.OrderNotes || "-"}
                              </span>
                            </p>
                          </div>
                        </div>
                      </TableCell>
                    </TableRow>
                  )}
                </React.Fragment>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>

      {mounted && totalPages > 1 && (
        <Pagination>
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious
                href="#"
                onClick={() => currentPage > 1 && onPageChange(currentPage - 1)}
                className={
                  currentPage <= 1 ? "pointer-events-none opacity-50" : ""
                }
              />
            </PaginationItem>

            {[...Array(totalPages)].map((_, index) => {
              const page = index + 1;
              if (
                page === 1 ||
                page === totalPages ||
                (page >= currentPage - 1 && page <= currentPage + 1)
              ) {
                return (
                  <PaginationItem key={page}>
                    <PaginationLink
                      href="#"
                      onClick={() => onPageChange(page)}
                      isActive={currentPage === page}
                    >
                      {page}
                    </PaginationLink>
                  </PaginationItem>
                );
              } else if (page === currentPage - 2 || page === currentPage + 2) {
                return (
                  <PaginationItem key={page}>
                    <PaginationEllipsis />
                  </PaginationItem>
                );
              }
              return null;
            })}

            <PaginationItem>
              <PaginationNext
                href="#"
                onClick={() =>
                  currentPage < totalPages && onPageChange(currentPage + 1)
                }
                className={
                  currentPage >= totalPages
                    ? "pointer-events-none opacity-50"
                    : ""
                }
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      )}

      {mounted && selectedOrder && (
        <DrawerDialog
          open={isDialogOpen}
          onOpenChange={setIsDialogOpen}
          steps={MOCK_STEPS[selectedOrder.OrderStatus] || MOCK_STEPS.default}
        />
      )}
    </div>
  );
}

// Mock dos steps que futuramente virá da API
const MOCK_STEPS: Record<string, Step[]> = {
  default: [
    {
      id: 1,
      status: "1. Pedido de Venda em Aberto",
      responsible: "João Silva",
      date: "20/11/2024",
      time: "10:00",
      active: true,
      icon: <ShoppingCart className="size-4" />,
    },
    {
      id: 2,
      status: "2. Financeiro Rejeitado",
      responsible: "Maria Oliveira",
      date: "21/11/2024",
      time: "10:00",
      active: true,
      icon: <XCircle className="size-4" />,
    },
    {
      id: 3,
      status: "3. Aguardando Liberação Financeira",
      responsible: "Maria Oliveira",
      date: "21/11/2024",
      time: "10:00",
      active: true,
      icon: <DollarSign className="size-4" />,
    },
    {
      id: 4,
      status: "4. Aguardando Liberação Comercial",
      responsible: "Maria Oliveira",
      date: "21/11/2024",
      time: "10:00",
      active: true,
      icon: <CheckCircle className="size-4" />,
    },
    {
      id: 5,
      status: "5. Aguardando Liberação Estoque",
      responsible: "Maria Oliveira",
      date: "21/11/2024",
      time: "10:00",
      active: true,
      icon: <Truck className="size-4" />,
    },
    {
      id: 6,
      status: "6. Aguardando Separação",
      responsible: "Maria Oliveira",
      date: "21/11/2024",
      time: "10:00",
      active: true,
      icon: <Clock className="size-4" />,
    },
    {
      id: 7,
      status: "7. Pedido em Separação",
      responsible: "Maria Oliveira",
      date: "21/11/2024",
      time: "10:00",
      active: true,
      icon: <Clock className="size-4" />,
    },
    {
      id: 8,
      status: "8. Aguardando Faturamento",
      responsible: "Maria Oliveira",
      date: "21/11/2024",
      time: "10:00",
      active: true,
      icon: <FileText className="size-4" />,
    },
    {
      id: 9,
      status: "9. Nota Fiscal Gerada",
      responsible: "Maria Oliveira",
      date: "21/11/2024",
      time: "10:00",
      active: true,
      icon: <CheckCircle className="size-4" />,
    },
  ],
};
