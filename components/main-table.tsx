"use client";

import { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Order } from "@/app/types/order";
import { useOrderAudit } from "@/app/hooks/useOrderAudit";
import { History, Plus, Minus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { DrawerDialog } from "./drawer-dialog";
import { Step } from "./status-timeline";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Badge } from "./ui/badge";
import { convertToBRL } from "@/app/utils/convertToBRL";

interface MainTableProps {
  data: Order[];
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const TruncatedText = ({ text }: { text: string }) => (
  <TooltipProvider>
    <Tooltip>
      <TooltipTrigger asChild>
        <span className="block truncate">{text}</span>
      </TooltipTrigger>
      <TooltipContent>
        <p>{text}</p>
      </TooltipContent>
    </Tooltip>
  </TooltipProvider>
);

export function MainTable({
  data,
  currentPage,
  totalPages,
  onPageChange,
}: MainTableProps) {
  const [mounted, setMounted] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState<string | null>(null);
  const [isLoadingAudit, setIsLoadingAudit] = useState(false);
  const [steps, setSteps] = useState<Step[]>([]);
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);

  const { fetchOrderAudit } = useOrderAudit();

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleOpenAudit = async (orderId: string) => {
    setSelectedOrder(orderId);
    setIsLoadingAudit(true);
    const auditSteps = await fetchOrderAudit(orderId);
    if (Array.isArray(auditSteps)) {
      console.log(auditSteps);
      setSteps(auditSteps);
    }
    setIsLoadingAudit(false);
  };

  const toggleRow = (index: number) => {
    setExpandedIndex(expandedIndex === index ? null : index);
  };

  if (!mounted) return null;

  return (
    <div className="flex flex-col ">
      <div className="flex-1 overflow-x-auto overflow-y-auto">
        <Table>
          <TableHeader className="sticky top-0 z-10 bg-white">
            <TableRow>
              <TableHead className="bg-white max-w-[200px]">
                Data Inclusão
              </TableHead>
              <TableHead className="bg-white max-w-[200px]">
                Nº Pedido
              </TableHead>
              <TableHead className="bg-white max-w-[200px]">
                Data Entrega
              </TableHead>
              <TableHead className="bg-white max-w-[200px]">
                Data Reprogramada
              </TableHead>
              <TableHead className="bg-white max-w-[200px]">Cliente</TableHead>
              <TableHead className="bg-white max-w-[200px]">
                Valor total pedido
              </TableHead>
              <TableHead className="bg-white max-w-[200px]">Vendedor</TableHead>
              <TableHead className="bg-white max-w-[200px]">
                Nº Pedido Mercos
              </TableHead>
              <TableHead className="bg-white max-w-[200px]">
                Status Pedido
              </TableHead>
              <TableHead className="bg-white w-[100px]">Ações</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data.map((order, index) => (
              <>
                <TableRow key={order.OrderId}>
                  <TableCell className="max-w-[200px]">
                    <TruncatedText text={order.Date} />
                  </TableCell>
                  <TableCell className="max-w-[200px]">
                    <TruncatedText text={order.OrderId} />
                  </TableCell>
                  <TableCell className="max-w-[200px]">
                    <TruncatedText text={order.DeliveryDate} />
                  </TableCell>
                  <TableCell className="max-w-[200px]">
                    <TruncatedText text={order.ReschedulingDate || "-"} />
                  </TableCell>
                  <TableCell className="max-w-[200px]">
                    <TruncatedText text={order.CustomerName} />
                  </TableCell>
                  <TableCell className="max-w-[200px]">
                    <TruncatedText
                      text={convertToBRL(Number(order.OrderTotal))}
                    />
                  </TableCell>
                  <TableCell className="max-w-[200px]">
                    <TruncatedText text={order.SellersName} />
                  </TableCell>
                  <TableCell className="max-w-[200px]">
                    <TruncatedText text={order?.OrderNumberMP || "-"} />
                  </TableCell>
                  <TableCell className="max-w-[200px]">
                    <Badge variant={order.OrderStatus}>
                      <TruncatedText text={order.OrderStatus} />
                    </Badge>
                  </TableCell>
                  <TableCell className="w-[100px]">
                    <div className="flex items-center gap-2">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => toggleRow(index)}
                      >
                        {expandedIndex === index ? (
                          <Minus className="size-4" />
                        ) : (
                          <Plus className="size-4" />
                        )}
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleOpenAudit(order.OrderId)}
                      >
                        <History className="size-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
                {expandedIndex === index && (
                  <TableRow>
                    <TableCell colSpan={12}>
                      <div className="p-4">
                        <div className="flex flex-col gap-4">
                          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                            <div>
                              <span className="font-medium">
                                Condição de Pagamento:
                              </span>{" "}
                              <TruncatedText text={order.PaymentCondition} />
                            </div>
                            <div>
                              <span className="font-medium">
                                Tipo de Frete:
                              </span>{" "}
                              <TruncatedText text={order.FreightType} />
                            </div>
                            <div>
                              <span className="font-medium">
                                Cliente Retira:
                              </span>{" "}
                              <TruncatedText text={order.CustomerPickup} />
                            </div>
                            <div>
                              <span className="font-medium">
                                Transportadora:
                              </span>{" "}
                              <TruncatedText text={order.CarrierName || "-"} />
                            </div>
                          </div>

                          <Table>
                            <TableHeader>
                              <TableRow>
                                <TableHead className="bg-white max-w-[200px]">
                                  Código Produto
                                </TableHead>
                                <TableHead className="bg-white max-w-[200px]">
                                  Produto
                                </TableHead>
                                <TableHead className="bg-white max-w-[100px]">
                                  Qtd.1
                                </TableHead>
                                <TableHead className="bg-white max-w-[80px]">
                                  Un.1
                                </TableHead>
                                <TableHead className="bg-white max-w-[100px]">
                                  Qtd.2
                                </TableHead>
                                <TableHead className="bg-white max-w-[80px]">
                                  Un.2
                                </TableHead>
                                <TableHead className="bg-white max-w-[150px]">
                                  Preço Un.
                                </TableHead>
                                <TableHead className="bg-white max-w-[150px]">
                                  Preço Total
                                </TableHead>
                                <TableHead className="bg-white max-w-[150px]">
                                  Atende com
                                </TableHead>
                                <TableHead className="bg-white max-w-[100px]">
                                  OP
                                </TableHead>
                                <TableHead className="bg-white max-w-[150px]">
                                  Status Produção
                                </TableHead>
                              </TableRow>
                            </TableHeader>
                            <TableBody>
                              {order.Items.map((item, itemIndex) => (
                                <TableRow key={itemIndex}>
                                  <TableCell className="max-w-[200px]">
                                    <TruncatedText text={item.ProductId} />
                                  </TableCell>
                                  <TableCell className="max-w-[200px]">
                                    <TruncatedText
                                      text={item.ProductDescription}
                                    />
                                  </TableCell>
                                  <TableCell className="max-w-[100px]">
                                    <TruncatedText
                                      text={item.QuantityUnit1.toString()}
                                    />
                                  </TableCell>
                                  <TableCell className="max-w-[80px]">
                                    <TruncatedText text={item.MeasureUnit1} />
                                  </TableCell>
                                  <TableCell className="max-w-[100px]">
                                    <TruncatedText
                                      text={item.QuantityUnit2.toString()}
                                    />
                                  </TableCell>
                                  <TableCell className="max-w-[80px]">
                                    <TruncatedText text={item.MeasureUnit2} />
                                  </TableCell>
                                  <TableCell className="max-w-[150px]">
                                    <TruncatedText
                                      text={convertToBRL(item.UnitaryPrice)}
                                    />
                                  </TableCell>
                                  <TableCell className="max-w-[150px]">
                                    <TruncatedText
                                      text={convertToBRL(item.TotalPrice)}
                                    />
                                  </TableCell>
                                  <TableCell className="max-w-[150px]">
                                    <TruncatedText
                                      text={item.OrderFulFilledBy || "-"}
                                    />
                                  </TableCell>
                                  <TableCell className="max-w-[100px]">
                                    <TruncatedText
                                      text={item.ProductionOrderId || "-"}
                                    />
                                  </TableCell>
                                  <TableCell className="max-w-[150px]">
                                    <TruncatedText
                                      text={item.ProductionStatus || "-"}
                                    />
                                  </TableCell>
                                </TableRow>
                              ))}
                            </TableBody>
                          </Table>

                          {order.OrderNotes && (
                            <div className="flex flex-col gap-2">
                              <h4 className="font-medium">Observações</h4>
                              <p className="text-sm whitespace-pre-line">
                                {order.OrderNotes}
                              </p>
                            </div>
                          )}
                        </div>
                      </div>
                    </TableCell>
                  </TableRow>
                )}
              </>
            ))}
          </TableBody>
        </Table>
      </div>

      {data.length > 0 && (
        <div className="flex items-center justify-end space-x-2 py-4 border-t">
          <Button
            variant="outline"
            size="sm"
            onClick={() => onPageChange(currentPage - 1)}
            disabled={currentPage === 1}
          >
            Anterior
          </Button>
          <div className="text-sm">
            Página {currentPage} de {totalPages}
          </div>
          <Button
            variant="outline"
            size="sm"
            onClick={() => onPageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
          >
            Próxima
          </Button>
        </div>
      )}

      <DrawerDialog
        open={!!selectedOrder}
        onOpenChange={(open) => !open && setSelectedOrder(null)}
        steps={steps}
        isLoading={isLoadingAudit}
        orderIdNumber={selectedOrder}
      />
    </div>
  );
}
