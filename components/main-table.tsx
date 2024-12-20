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

import {
  CheckCircle,
  Clock,
  XCircle,
  DollarSign,
  ShoppingCart,
  Truck,
  FileText,
  PlusIcon,
  SearchIcon,
  MinusIcon,
} from "lucide-react";

interface OrderStatus {
  orderNumber: string;
  actualBalance: string;
  availableQuantity: string;
  salesOrdersQuantity: string;
  inTransitQuantity: string;
  needQuantity: string;
  status: string;
  subStatus?: string;
}

// Mock que futuramente virá da API
const MOCK_ORDERS: OrderStatus[] = [
  {
    orderNumber: "001",
    actualBalance: "1000000",
    availableQuantity: "5000",
    salesOrdersQuantity: "1000",
    inTransitQuantity: "1000",
    needQuantity: "Urgente",
    status: "Pedido Faturado",
    subStatus: "Em produção",
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
  "Análise de Estoque": [
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
      subStatus: [
        {
          id: "5.1",
          status: "Em Separação",
          responsible: "Carlos Santos",
          date: "21/11/2024",
          time: "11:00",
          active: true,
          icon: <Clock className="size-4" />,
        },
      ],
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
  "Ordem de Produção": [
    // Mesma estrutura do "Análise de Estoque"
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
      subStatus: [
        {
          id: "5.1",
          status: "Em Separação",
          responsible: "Carlos Santos",
          date: "21/11/2024",
          time: "11:00",
          active: true,
          icon: <Clock className="size-4" />,
        },
      ],
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

export function MainTable() {
  const [expandedRows, setExpandedRows] = useState<string[]>([]);
  const [isDrawerOpen, setIsDrawerOpen] = useState<boolean>(false);
  const [selectedStatus, setSelectedStatus] = useState<string>("");
  const [orders, setOrders] = useState<OrderStatus[]>(MOCK_ORDERS);

  // Simulação de chamada à API para buscar os pedidos
  const fetchOrders = async () => {
    try {
      // Futuramente será substituído pela chamada real à API
      setOrders(MOCK_ORDERS);
    } catch (error) {
      console.error("Erro ao buscar pedidos:", error);
    }
  };

  // Simulação de chamada à API para buscar os steps de um status
  // const fetchStepsForStatus = async (status: string): Promise<Step[]> => {
  //   try {
  //     // Futuramente será substituído pela chamada real à API
  //     return MOCK_STEPS[status] || MOCK_STEPS.default;
  //   } catch (error) {
  //     console.error("Erro ao buscar steps:", error);
  //     return MOCK_STEPS.default;
  //   }
  // };

  const getStepsForStatus = (status: string): Step[] => {
    // Futuramente isso será uma chamada à API
    if (status === "Ordem de Produção" || status === "Análise de Estoque") {
      return MOCK_STEPS[status] || MOCK_STEPS.default;
    }
    return MOCK_STEPS.default;
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const toggleRow = (orderNumber: string) => {
    setExpandedRows((prev) =>
      prev.includes(orderNumber)
        ? prev.filter((num) => num !== orderNumber)
        : [...prev, orderNumber]
    );
  };

  // const toggleDrawer = () => {
  //   setIsDrawerOpen((prev) => !prev);
  // };

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

  const handleSearchClick = (status: string) => {
    setSelectedStatus(status);
    setIsDrawerOpen(true);
  };

  return (
    <>
      <DrawerDialog
        open={isDrawerOpen}
        onOpenChange={setIsDrawerOpen}
        steps={getStepsForStatus(selectedStatus)}
      />
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
          {orders.map((order) => (
            <React.Fragment key={order.orderNumber}>
              <TableRow>
                <TableCell className="font-medium">
                  {order.orderNumber}
                </TableCell>
                <TableCell>{formatCurrency(order.actualBalance)}</TableCell>
                <TableCell>{order.availableQuantity}</TableCell>
                <TableCell>{order.salesOrdersQuantity}</TableCell>
                <TableCell>{order.inTransitQuantity}</TableCell>
                <TableCell>{order.needQuantity}</TableCell>
                <TableCell>
                  <Badge variant={setVariant(order.status)}>
                    {order.status}
                  </Badge>
                </TableCell>
                <TableCell className="flex items-center gap-4 h-[inherit]">
                  <button onClick={() => toggleRow(order.orderNumber)}>
                    {expandedRows.includes(order.orderNumber) ? (
                      <MinusIcon className="size-4" />
                    ) : (
                      <PlusIcon className="size-4" />
                    )}
                  </button>
                  <button onClick={() => handleSearchClick(order.status)}>
                    <SearchIcon className="size-4" />
                  </button>
                </TableCell>
              </TableRow>
              {expandedRows.includes(order.orderNumber) && (
                <TableRow>
                  <TableCell colSpan={8}>
                    <div
                      className="gap-4 flex flex-col w-full transition-max-height duration-300 ease-in-out overflow-hidden"
                      style={{
                        maxHeight: expandedRows.includes(order.orderNumber)
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
