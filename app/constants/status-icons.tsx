import {
  Clock,
  Ban,
  UserCheck,
  UserX,
  Package,
  FileText,
  Box,
  Trash2,
  FileEdit,
  PackageSearch,
  FileStack,
  Copy,
  Truck,
  AlertCircle,
  ShieldCheck,
  ShieldX,
  ArrowLeftRight,
  RotateCcw,
  CheckCircle2,
  XCircle,
} from "lucide-react";

export interface OrderStatus {
  keyId: string;
  description: string;
}

export const STATUS_LIST = [
  { keyId: "A1", description: "Aguardando Aprovação Comercial" },
  { keyId: "DA", description: "Alteração do pedido" },
  { keyId: "AC", description: "Aprovação Comercial" },
  { keyId: "O1", description: "Baixa Ordem Produção" },
  { keyId: "CB", description: "Cadastro Bloqueado" },
  { keyId: "CL", description: "Cadastro Liberado" },
  { keyId: "CS", description: "Cadastro Suspenso" },
  { keyId: "CP", description: "Criação Pedido via Cópia" },
  { keyId: "PP", description: "Criação pedido itens não faturado (parcial)" },
  { keyId: "DF", description: "Determinação de Frete CIF" },
  { keyId: "DC", description: "Devolução de Compras" },
  { keyId: "DI", description: "Digitação do pedido (inclusão)" },
  { keyId: "ES", description: "Estorno Separação" },
  { keyId: "EP", description: "Estorno do pedido" },
  { keyId: "EN", description: "Exclusão Nota Fiscal" },
  { keyId: "DE", description: "Exclusão do pedido" },
  { keyId: "LC", description: "Liberação de crédito" },
  { keyId: "LE", description: "Liberação de estoque" },
  { keyId: "LP", description: "Liberação do pedido (quantidades)" },
  { keyId: "LT", description: "Liberação total (crédito e estoque" },
  { keyId: "ME", description: "Material Entregue - cliente/ transportadora" },
  {
    keyId: "MS",
    description: "Mudança de Status automática de bloqueio de estoque",
  },
  { keyId: "NF", description: "Nota fiscal preparada" },
  { keyId: "OT", description: "Operação Triangular" },
  { keyId: "R1", description: "Rejeição Comercial" },
  { keyId: "RC", description: "Rejeição de Crédito" },
  { keyId: "RS", description: "Retirada do pedido da separação" },
  { keyId: "SF", description: "Separação Finalizada" },
  { keyId: "SP", description: "Separação de Pedido" },
  { keyId: "SS", description: "Solicitação de Separação" },
  {
    keyId: "T1",
    description: "Tentativa de Liberação Comercial sem aprovação financeira",
  },
  {
    keyId: "T2",
    description: "Tentativa de Liberação Estoque sem aprovação comercial",
  },
  { keyId: "T3", description: "Tentativa de Liberação Pedido com Retrições" },
  { keyId: "TA", description: "Tentativa de alteração frustrada" },
  { keyId: "TE", description: "Tentativa de exclusão frustrada" },
] as const;

export const getStatusIcon = (statusKeyId: string) => {
  const iconMap = {
    A1: Clock, // Aguardando Aprovação Comercial
    DA: FileEdit, // Alteração do pedido
    AC: UserCheck, // Aprovação Comercial
    O1: Box, // Baixa Ordem Produção
    CB: ShieldX, // Cadastro Bloqueado
    CL: ShieldCheck, // Cadastro Liberado
    CS: AlertCircle, // Cadastro Suspenso
    CP: Copy, // Criação Pedido via Cópia
    PP: FileStack, // Criação pedido itens não faturado (parcial)
    DF: Truck, // Determinação de Frete CIF
    DC: ArrowLeftRight, // Devolução de Compras
    DI: FileEdit, // Digitação do pedido (inclusão)
    ES: RotateCcw, // Estorno Separação
    EP: RotateCcw, // Estorno do pedido
    EN: Trash2, // Exclusão Nota Fiscal
    DE: Trash2, // Exclusão do pedido
    LC: CheckCircle2, // Liberação de crédito
    LE: Package, // Liberação de estoque
    LP: Package, // Liberação do pedido (quantidades)
    LT: CheckCircle2, // Liberação total
    ME: Truck, // Material Entregue
    MS: AlertCircle, // Mudança de Status automática
    NF: FileText, // Nota fiscal preparada
    OT: ArrowLeftRight, // Operação Triangular
    R1: UserX, // Rejeição Comercial
    RC: Ban, // Rejeição de Crédito
    RS: PackageSearch, // Retirada do pedido da separação
    SF: CheckCircle2, // Separação Finalizada
    SP: Box, // Separação de Pedido
    SS: PackageSearch, // Solicitação de Separação
    T1: XCircle, // Tentativa de Liberação Comercial sem aprovação
    T2: XCircle, // Tentativa de Liberação Estoque sem aprovação
    T3: XCircle, // Tentativa de Liberação Pedido com Retrições
    TA: XCircle, // Tentativa de alteração frustrada
    TE: XCircle, // Tentativa de exclusão frustrada
  };

  return iconMap[statusKeyId as keyof typeof iconMap] || Clock;
};
