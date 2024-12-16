"use client";
import React, { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { PlusIcon, SearchIcon, MinusIcon } from "lucide-react";
import { Badge } from "./ui/badge";
import { DrawerDialog } from "./drawer-dialog";

const invoices = [
  {
    orderNumber: "001",
    actualBalance: "1000000",
    availableQuantity: "5000",
    salesOrdersQuantity: "1000",
    inTransitQuantity: "1000",
    needQuantity: "Urgente",
    status: "Pedido Faturado",
  },
  {
    orderNumber: "002",
    actualBalance: "1000000",
    availableQuantity: "5000",
    salesOrdersQuantity: "1000",
    inTransitQuantity: "1000",
    needQuantity: "Urgente",
    status: "Ordem de Produção",
  },
  {
    orderNumber: "003",
    actualBalance: "1000000",
    availableQuantity: "5000",
    salesOrdersQuantity: "1000",
    inTransitQuantity: "1000",
    needQuantity: "Urgente",
    status: "Análise de Estoque",
  },
];

export function MainTable() {
  const [expandedRows, setExpandedRows] = useState<string[]>([]);
  const [isDrawerOpen, setIsDrawerOpen] = useState<boolean>(false);

  const toggleRow = (orderNumber: string) => {
    setExpandedRows((prev) =>
      prev.includes(orderNumber)
        ? prev.filter((num) => num !== orderNumber)
        : [...prev, orderNumber]
    );
  };

  const toggleDrawer = () => {
    setIsDrawerOpen((prev) => !prev);
  };

  const formatCurrency = (value: string) => {
    return new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    }).format(Number(value));
  };

  const setVariant = (status: string) => {
    if (status === "Pedido Faturado") {
      return "invoiceOrder";
    }
    if (status === "Ordem de Produção") {
      return "productionOrder";
    }
    if (status === "Análise de Estoque") {
      return "stockAnalysis";
    }
    return "default";
  };

  return (
    <>
      <DrawerDialog open={isDrawerOpen} onOpenChange={setIsDrawerOpen} />
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Nº Pedido </TableHead>
            <TableHead>Saldo Atual</TableHead>
            <TableHead>Qtd. Disponível</TableHead>
            <TableHead>Qtd. Pedidos de Vendas</TableHead>
            <TableHead>Qtd. Em Trânsito</TableHead>
            <TableHead>Necessidade</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Ações</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {invoices.map((invoice) => (
            <React.Fragment key={invoice.orderNumber}>
              <TableRow>
                <TableCell className="font-medium">
                  {invoice.orderNumber}
                </TableCell>
                <TableCell>{formatCurrency(invoice.actualBalance)}</TableCell>
                <TableCell>{invoice.availableQuantity}</TableCell>
                <TableCell>{invoice.salesOrdersQuantity}</TableCell>
                <TableCell>{invoice.inTransitQuantity}</TableCell>
                <TableCell>{invoice.needQuantity}</TableCell>
                <TableCell>
                  <Badge variant={setVariant(invoice.status)}>
                    {invoice.status}
                  </Badge>
                </TableCell>
                <TableCell className="flex items-center gap-4 h-[inherit]">
                  <button onClick={() => toggleRow(invoice.orderNumber)}>
                    {expandedRows.includes(invoice.orderNumber) ? (
                      <MinusIcon className="size-4" />
                    ) : (
                      <PlusIcon className="size-4" />
                    )}
                  </button>
                  <button onClick={toggleDrawer}>
                    <SearchIcon className="size-4" />
                  </button>
                </TableCell>
              </TableRow>
              {expandedRows.includes(invoice.orderNumber) && (
                <TableRow>
                  <TableCell colSpan={8}>
                    <div
                      className="gap-4 flex flex-col w-full transition-max-height duration-300 ease-in-out overflow-hidden"
                      style={{
                        maxHeight: expandedRows.includes(invoice.orderNumber)
                          ? "500px"
                          : "0",
                      }}
                    >
                      <div className="flex flex-row gap-2 w-full justify-between">
                        <p className="w-1/3 font-thin">
                          Filial: <span className="font-normal">SP</span>
                        </p>
                        <p className="w-1/3 font-thin">
                          Armazem:{" "}
                          <span className="font-normal">São Paulo</span>
                        </p>
                        <p className="w-1/3 font-thin">
                          Qtd. Em Ped. Compras:{" "}
                          <span className="font-normal">10</span>
                        </p>
                      </div>
                      <div className="flex flex-row gap-2 w-full justify-between">
                        <p className="w-1/3 font-thin">
                          Código: <span className="font-normal">OP001</span>
                        </p>
                        <p className="w-1/3 font-thin">
                          Qtd. Reservada:{" "}
                          <span className="font-normal">10</span>
                        </p>
                        <p className="w-1/3 font-thin"></p>
                      </div>
                      <div className="flex flex-row gap-2 w-full justify-between">
                        <p className="font-thin">
                          Descrição:{" "}
                          <span className="font-normal">
                            Descrição do pedido um dois três quatro Descrição do
                            pedido um dois três quatroDescrição do pedido um
                            dois três quatroDescrição do pedido um dois três
                            quatrovDescrição do pedido um dois três quatro
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
    </>
  );
}
