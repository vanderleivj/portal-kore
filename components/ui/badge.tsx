/* eslint-disable @typescript-eslint/no-explicit-any */
import * as React from "react";
import { cva } from "class-variance-authority";
import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center rounded-md border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
  {
    variants: {
      variant: {
        default:
          "border-transparent bg-primary text-primary-foreground shadow hover:bg-primary/80",
        secondary:
          "border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80",
        destructive:
          "border-transparent bg-destructive text-destructive-foreground shadow hover:bg-destructive/80",
        outline: "text-foreground",
        productionOrder: "bg-[#E0F2F1] text-[#00695C] rounded-full",
        invoiceOrder: "bg-[#FCE4EC] text-[#C2185B] rounded-full",
        stockAnalysis: "bg-[#F3E5F5] text-[#6A1B9A] rounded-full",
        Aguardando_Aprovação_Comercial: "bg-[#E0F7FA] text-[#00796B]",
        Alteração_do_pedido: "bg-[#FFEBEE] text-[#D32F2F]",
        Aprovação_Comercial: "bg-[#E8F5E9] text-[#388E3C]",
        Baixa_Ordem_Produção: "bg-[#FFF3E0] text-[#F57C00]",
        Cadastro_Bloqueado: "bg-[#FFCDD2] text-[#C62828]",
        Cadastro_Liberado: "bg-[#C8E6C9] text-[#2E7D32]",
        Cadastro_Suspenso: "bg-[#FFF9C4] text-[#FBC02D]",
        Criação_Pedido_via_Cópia: "bg-[#E1F5FE] text-[#0288D1]",
        Criação_pedido_itens_não_faturado_parcial:
          "bg-[#F3E5F5] text-[#6A1B9A]",
        Determinação_de_Frete_CIF: "bg-[#EDE7F6] text-[#5E35B1]",
        Devolução_de_Compras: "bg-[#FCE4EC] text-[#C2185B]",
        Digitação_do_pedido_inclusão: "bg-[#E0F2F1] text-[#00695C]",
        Estorno_Separação: "bg-[#FFECB3] text-[#FFA000]",
        Estorno_do_pedido: "bg-[#FFCCBC] text-[#E64A19]",
        Exclusão_Nota_Fiscal: "bg-[#D1C4E9] text-[#512DA8]",
        Exclusão_do_pedido: "bg-[#FFCDD2] text-[#D32F2F]",
        Liberação_de_crédito: "bg-[#C5E1A5] text-[#388E3C]",
        Nota_fiscal_Gerada: "bg-[#C5E1A5] text-[#388E3C]",
        Liberação_de_estoque: "bg-[#B3E5FC] text-[#0288D1]",
        Liberação_do_pedido_quantidades: "bg-[#FFCC80] text-[#F57C00]",
        Liberação_total_crédito_e_estoque: "bg-[#B2DFDB] text-[#00796B]",
        Material_Entregue_cliente_transportadora: "bg-[#FFECB3] text-[#FBC02D]",
        Mudança_de_Status_automática_de_bloqueio_de_estoque:
          "bg-[#FFAB91] text-[#D84315]",
        Nota_fiscal_preparada: "bg-[#C8E6C9] text-[#388E3C]",
        Operação_Triangular: "bg-[#FFCCBC] text-[#E64A19]",
        Rejeição_Comercial: "bg-[#FFCDD2] text-[#C62828]",
        Rejeição_de_Crédito: "bg-[#FFAB91] text-[#D84315]",
        Retirada_do_pedido_da_separação: "bg-[#FFF9C4] text-[#FBC02D]",
        Separação_Finalizada: "bg-[#C5E1A5] text-[#388E3C]",
        Separação_de_Pedido: "bg-[#B3E5FC] text-[#0288D1]",
        Solicitação_de_Separação: "bg-[#FFCC80] text-[#F57C00]",
        Tentativa_de_Liberação_Comercial_sem_aprovação_financeira:
          "bg-[#FFAB91] text-[#D84315]",
        Tentativa_de_Liberação_Estoque_sem_aprovação_comercial:
          "bg-[#FFCCBC] text-[#E64A19]",
        Tentativa_de_Liberação_Pedido_com_Retrições:
          "bg-[#FFCDD2] text-[#C62828]",
        Tentativa_de_alteração_frustrada: "bg-[#FFAB91] text-[#D84315]",
        Tentativa_de_exclusão_frustrada: "bg-[#FFCCBC] text-[#E64A19]",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

export interface BadgeProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: string;
}

function Badge({ className, variant, ...props }: BadgeProps) {
  const formatVariantName = (status: string | undefined): string => {
    if (!status) return "default";
    return status.replace(/ /g, "_");
  };

  return (
    <div
      className={cn(
        badgeVariants({ variant: formatVariantName(variant) as any }),
        className
      )}
      {...props}
    />
  );
}

export { Badge, badgeVariants };
