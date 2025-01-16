"use client";

import { DatePickerWithRange } from "@/components/ui/date-range-picker";
import { useOrders } from "@/app/hooks/useOrders";
import { MainTable } from "@/components/main-table";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { X } from "lucide-react";

export default function Home() {
  const {
    orders,
    isLoading,
    error,
    dateRange,
    setDateRange,
    currentPage,
    totalPages,
    changePage,
    filterByOrderId,
    refetch,
  } = useOrders();

  const [orderIdInput, setOrderIdInput] = useState("");
  const [orderIds, setOrderIds] = useState<string[]>([]);

  const handleOrderIdChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, "").slice(0, 6);
    setOrderIdInput(value);

    if (value.length === 6) {
      // Adiciona o novo ID à lista se ele ainda não existir
      if (!orderIds.includes(value)) {
        const newOrderIds = [...orderIds, value];
        setOrderIds(newOrderIds);
        filterByOrderId(newOrderIds.join(","));
      }
      // Limpa o input após adicionar
      setOrderIdInput("");
    }
  };

  return (
    <main className="flex min-h-screen flex-col p-6 gap-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-medium text-primary-color">
          Lista de Pedidos
        </h1>
        <DatePickerWithRange
          date={dateRange}
          onDateChange={setDateRange}
          className="w-auto"
        />
      </div>

      <div className="flex justify-between items-center mt-8">
        <div className="w-full max-w-xs">
          <Input
            type="text"
            placeholder="Filtrar por número do pedido (6 dígitos)"
            value={orderIdInput}
            onChange={handleOrderIdChange}
            className="w-full bg-white"
            maxLength={6}
          />
        </div>
      </div>

      <div className="flex flex-row flex-wrap gap-2 items-center">
        <p className="text-sm text-gray-500 whitespace-nowrap">
          Filtros aplicados:
        </p>
        <div className="flex flex-wrap gap-2">
          {orderIds.length > 0 && (
            <Badge
              variant="outline"
              className="whitespace-nowrap flex items-center gap-1"
            >
              <span className="flex items-center gap-1">
                Pedidos: {orderIds.join(", ")}
                <button
                  onClick={() => {
                    setOrderIds([]);
                    refetch();
                  }}
                  className="hover:bg-gray-100 rounded-full p-0.5"
                >
                  <X className="h-3 w-3" />
                </button>
              </span>
            </Badge>
          )}
          {dateRange?.from && dateRange?.to && (
            <Badge
              variant="outline"
              className="whitespace-nowrap flex items-center gap-1"
            >
              <span className="flex items-center gap-1">
                Período: {dateRange.from.toLocaleDateString()} -{" "}
                {dateRange.to.toLocaleDateString()}
              </span>
            </Badge>
          )}
        </div>
      </div>

      {error && (
        <div className="text-red-500 text-sm bg-red-50 p-4 rounded-md">
          {error}
        </div>
      )}

      {isLoading ? (
        <div className="flex items-center justify-center h-64">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary" />
        </div>
      ) : (
        <MainTable
          data={orders}
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={changePage}
        />
      )}
    </main>
  );
}
