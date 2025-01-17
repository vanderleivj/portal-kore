/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect, useCallback, useRef } from "react";
import { format } from "date-fns";
import { Order, OrderListResponse } from "../types/order";
import { DateRange } from "react-day-picker";
import Cookies from "js-cookie";
import axios from "axios";

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

  const isFirstRender = useRef(true);

  const fetchOrders = useCallback(
    async (params?: FetchOrdersParams) => {
      if (!dateRange?.from || !dateRange?.to) return;

      setIsLoading(true);
      setError(null);

      try {
        const dateFrom = format(dateRange.from, "yyyyMMdd");
        const dateTo = format(dateRange.to, "yyyyMMdd");
        const basicToken = Cookies.get("basic-auth");

        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_API_URL}/orderlist`,
          {
            params: {
              datefrom: dateFrom,
              dateto: dateTo,
              Page: params?.page || currentPage,
              PageSize: params?.pageSize || 10,
              orderid: params?.orderId || "",
              pagination: params?.pagination || "Y",
            },
            headers: {
              Authorization: basicToken || "",
              "Content-Type": "application/json",
            },
          }
        );

        const data: OrderListResponse = response.data;
        setOrders(data.result || []);
        setTotalPages(data.totalPages || 1);
      } catch (err) {
        console.error("Erro ao buscar pedidos:", err);
        setError("Erro ao carregar a lista de pedidos");
      } finally {
        setIsLoading(false);
      }
    },
    [dateRange, currentPage]
  );

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }

    if (dateRange?.from && dateRange?.to) {
      fetchOrders();
    }
  }, [dateRange, fetchOrders]);

  const changePage = useCallback(
    (page: number) => {
      setCurrentPage(page);
      fetchOrders({ page });
    },
    [fetchOrders]
  );

  const filterByOrderId = useCallback(
    (orderId: string) => {
      fetchOrders({ orderId, pagination: "N" });
    },
    [fetchOrders]
  );

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
