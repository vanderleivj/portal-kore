import { useState, useEffect } from "react";
import { format } from "date-fns";
import { api } from "@/lib/axios";
import { Order, OrderListResponse } from "../types/order";
import { DateRange } from "react-day-picker";

interface FetchOrdersParams {
  page?: number;
  pageSize?: number;
  orderId?: string;
  pagination?: "Y" | "N";
}

export function useOrders() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [dateRange, setDateRange] = useState<DateRange | undefined>(() => {
    const today = new Date();
    return {
      from: today,
      to: today,
    };
  });

  async function fetchOrders(params?: FetchOrdersParams) {
    if (!dateRange?.from || !dateRange?.to) return;

    setIsLoading(true);
    setError(null);

    try {
      const dateFrom = format(dateRange.from, "yyyyMMdd");
      const dateTo = format(dateRange.to, "yyyyMMdd");

      const response = await api.get<OrderListResponse>(`/orderlist`, {
        params: {
          datefrom: dateFrom,
          dateto: dateTo,
          Page: params?.page || currentPage,
          PageSize: params?.pageSize || 10,
          orderid: params?.orderId || "",
          pagination: params?.pagination || "Y",
        },
      });

      setOrders(response.data.result || []);
      setTotalPages(response.data.totalPages || 1);
    } catch (err) {
      console.error("Erro ao buscar pedidos:", err);
      setError("Erro ao carregar a lista de pedidos");
    } finally {
      setIsLoading(false);
    }
  }

  const changePage = (page: number) => {
    setCurrentPage(page);
    fetchOrders({ page });
  };

  const filterByOrderId = (orderId: string) => {
    fetchOrders({ orderId, pagination: "N" });
  };

  useEffect(() => {
    if (dateRange?.from && dateRange?.to) {
      fetchOrders();
    }
  }, [dateRange]);

  return {
    orders,
    isLoading,
    error,
    dateRange,
    setDateRange,
    currentPage,
    totalPages,
    changePage,
    filterByOrderId,
    refetch: fetchOrders,
  };
}
