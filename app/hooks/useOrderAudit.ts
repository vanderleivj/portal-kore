import { useState, createElement } from "react";
import { api } from "@/lib/axios";
import { Step } from "@/components/status-timeline";
import { getStatusIcon, STATUS_LIST } from "@/app/constants/status-icons";
import { getCookie } from "cookies-next";

interface ApiOrderAudit {
  ProcessDescription: string;
  UserId: string;
  Username: string;
  Date: string;
  Hour: string;
  Duration: string;
}

interface ApiOrderAuditResponse {
  result: ApiOrderAudit[];
  hasNext: boolean;
  pageSize: number;
  Records: number;
  totalPages: number;
  Pagination: string;
  OrderId: string;
}

export interface OrderAudit {
  steps: Step[];
}

export function useOrderAudit() {
  const [auditData, setAuditData] = useState<OrderAudit>({ steps: [] });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const getStatusKeyId = (description: string): string => {
    const status = STATUS_LIST.find(
      (s) => s.description.toLowerCase() === description.toLowerCase()
    );
    return status?.keyId || "DI"; // DI como fallback (Digitação do pedido)
  };

  const transformAuditData = (data: ApiOrderAuditResponse): Step[] => {
    return data.result.map((audit, index) => ({
      id: index + 1,
      status: audit.ProcessDescription,
      responsible: audit.Username.trim(),
      date: audit.Date,
      time: audit.Hour,
      active: true,
      icon: createElement(
        getStatusIcon(getStatusKeyId(audit.ProcessDescription)),
        {
          className: "size-4",
        }
      ),
    }));
  };

  const fetchOrderAudit = async (orderId: string): Promise<Step[]> => {
    try {
      setIsLoading(true);
      setError(null);

      const token = getCookie("auth-token");
      const response = await api.get<ApiOrderAuditResponse>(
        `OrderAudit/?orderid=${orderId}&pagination=N`,
        {
          headers: {
            Authorization: token ? `Bearer ${token}` : "",
          },
        }
      );

      const steps = transformAuditData(response.data);
      setAuditData({ steps });
      return steps;
    } catch (err) {
      setError("Erro ao buscar dados de auditoria do pedido");
      console.error("Erro ao buscar dados de auditoria:", err);
      return [];
    } finally {
      setIsLoading(false);
    }
  };

  return {
    auditData,
    isLoading,
    error,
    fetchOrderAudit,
  };
}
