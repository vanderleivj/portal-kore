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
import { Order } from "@/app/types/order";
import { useOrderAudit } from "@/app/hooks/useOrderAudit";
import { InboxIcon, Search, Minus, Plus } from "lucide-react";
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
  const [orderIdNumber, setOrderIdNumber] = useState<string | null>(null);
  const {
    fetchOrderAudit,
    auditData,
    isLoading: isLoadingAudit,
  } = useOrderAudit();

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleOrderClick = async (order: Order) => {
    console.log(order);
    setSelectedOrder(order);
    setIsDialogOpen(true);
    setOrderIdNumber(order.OrderId);
    await fetchOrderAudit(order.OrderId);
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
    <div className="flex flex-col gap-4 sm:max-w-none max-w-[370px] mx-auto">
      <div className="border rounded-md ">
        <div className="overflow-x-auto overflow-y-auto max-h-[calc(100vh-250px)]">
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
                              {order.QuantityUnit1} {order.MeasureUnit1}
                            </span>
                          </TooltipTrigger>
                          <TooltipContent>
                            <p>
                              {order.QuantityUnit1} {order.MeasureUnit1}
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
                              {order.QuantityUnit2} {order.MeasureUnit2}
                            </span>
                          </TooltipTrigger>
                          <TooltipContent>
                            <p>
                              {order.QuantityUnit2} {order.MeasureUnit2}
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
                      <button
                        onClick={() => handleOrderClick(order)}
                        className={
                          isLoadingAudit ? "opacity-50 cursor-not-allowed" : ""
                        }
                        disabled={isLoadingAudit}
                      >
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
          steps={auditData.steps}
          isLoading={isLoadingAudit}
          orderIdNumber={orderIdNumber}
        />
      )}
    </div>
  );
}
