"use client";

import { DatePickerWithRange } from "@/components/ui/date-range-picker";
import { useOrders } from "@/app/hooks/useOrders";
import { MainTable } from "@/components/main-table";
import { Input } from "@/components/ui/input";
import { useState, useEffect } from "react";
import { Badge } from "@/components/ui/badge";
import { X } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { DateRange } from "react-day-picker";

export function OrdersContent() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const initialDateRange = {
    from: new Date(new Date().setDate(new Date().getDate() - 10)),
    to: new Date(),
  };

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

  useEffect(() => {
    const urlOrderIds = searchParams.get("orderIds");
    const dateFrom = searchParams.get("dateFrom");
    const dateTo = searchParams.get("dateTo");

    if (urlOrderIds) {
      const ids = urlOrderIds.split(",");
      setOrderIds(ids);
      filterByOrderId(urlOrderIds);
      return;
    }

    if (dateFrom && dateTo) {
      setDateRange({
        from: new Date(dateFrom),
        to: new Date(dateTo),
      });
    } else {
      setDateRange(initialDateRange);
    }
  }, [searchParams]);

  const updateURL = (newOrderIds?: string[], newDateRange?: DateRange) => {
    const params = new URLSearchParams();

    if (newOrderIds?.length) {
      params.set("orderIds", newOrderIds.join(","));
    }

    if (newDateRange?.from && newDateRange?.to) {
      params.set("dateFrom", newDateRange.from.toISOString());
      params.set("dateTo", newDateRange.to.toISOString());
    }

    router.push(`?${params.toString()}`);
  };

  const handleOrderIdChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, "").slice(0, 6);
    setOrderIdInput(value);

    if (value.length === 6) {
      if (!orderIds.includes(value)) {
        const newOrderIds = [...orderIds, value];
        setOrderIds(newOrderIds);
        filterByOrderId(newOrderIds.join(","));
        updateURL(newOrderIds, undefined);
      }
      setOrderIdInput("");
    }
  };

  const handleDateChange = (newDateRange: DateRange | undefined) => {
    setDateRange(newDateRange);
    if (newDateRange?.from && newDateRange?.to) {
      setOrderIds([]);
      updateURL([], newDateRange);
    }
  };

  const handleRemoveOrderIds = () => {
    setOrderIds([]);
    if (dateRange?.from && dateRange?.to) {
      updateURL([], dateRange);
      refetch();
    } else {
      updateURL();
      refetch();
    }
  };

  const handleRemoveDateFilter = () => {
    setDateRange(undefined);
    if (orderIds.length > 0) {
      updateURL(orderIds);
      filterByOrderId(orderIds.join(","));
    } else {
      updateURL();
      refetch();
    }
  };

  return (
    <main className="flex min-h-screen flex-col p-4 md:p-6 gap-4 md:gap-6">
      <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4">
        <h1 className="text-xl md:text-2xl font-medium text-primary-color">
          Lista de Pedidos
        </h1>
        <div className="w-full md:w-auto">
          <DatePickerWithRange
            date={dateRange}
            onDateChange={handleDateChange}
            className="w-full md:w-auto"
          />
        </div>
      </div>

      <div className="w-full max-w-xs">
        <Input
          type="text"
          placeholder="Filtrar por número do pedido (6 dígitos)"
          value={orderIdInput}
          onChange={handleOrderIdChange}
          className="w-full bg-white text-sm"
          maxLength={6}
        />
      </div>

      <div className="flex flex-col md:flex-row flex-wrap gap-2 items-start md:items-center">
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
                  onClick={handleRemoveOrderIds}
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
                <button
                  onClick={handleRemoveDateFilter}
                  className="hover:bg-gray-100 rounded-full p-0.5"
                >
                  <X className="h-3 w-3" />
                </button>
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
