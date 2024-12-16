import {
  CheckCircle,
  Clock,
  XCircle,
  DollarSign,
  ShoppingCart,
  Truck,
  FileText,
} from "lucide-react";

const steps = [
  {
    id: 1,
    status: "1. Pedido de Venda em Aberto",
    responsavel: "João Silva",
    data: "20/11/2024",
    hora: "10:00",
    ativo: true,
    icone: <ShoppingCart className="size-4" />,
  },
  {
    id: 2,
    status: "2. Financeiro Rejeitado",
    responsavel: "Maria Oliveira",
    data: "21/11/2024",
    hora: "10:00",
    ativo: true,
    icone: <XCircle className="size-4" />,
  },
  {
    id: 3,
    status: "3. Aguardando Liberação Financeira",
    ativo: false,
    icone: <DollarSign className="size-4" />,
  },
  {
    id: 4,
    status: "4. Aguardando Liberação Comercial",
    ativo: false,
    icone: <CheckCircle className="size-4" />,
  },
  {
    id: 5,
    status: "5.   Aguardando Liberação Estoque",
    ativo: false,
    icone: <Truck className="size-4" />,
  },
  {
    id: 6,
    status: "6. Aguardando Separação",
    ativo: false,
    icone: <Clock className="size-4" />,
  },
  {
    id: 7,
    status: "7. Pedido em Separação",
    ativo: false,
    icone: <Clock className="size-4" />,
  },
  {
    id: 8,
    status: "8.   Aguardando Faturamento",
    ativo: false,
    icone: <FileText className="size-4" />,
  },
  {
    id: 9,
    status: "9. Aguardando Faturamento Parcial",
    ativo: false,
    icone: <FileText className="size-4" />,
  },
  {
    id: 10,
    status: "10.  Nota Fiscal Gerada",
    ativo: false,
    icone: <CheckCircle className="size-4" />,
  },
];

export function StatusTimeline() {
  return (
    <div className="flex flex-col items-start overflow-y-auto">
      {steps.map((step) => (
        <div
          key={step.id}
          className={`flex items-center h-16 mb-4  w-full ${
            step.ativo ? "opacity-100" : "opacity-50"
          }`}
        >
          <div
            className={`w-10 h-9 rounded-full flex items-center justify-center mr-4 ${
              step.ativo ? "bg-[#A2C616]" : "bg-[#235A81] text-white/50"
            }`}
          >
            {step.icone}
          </div>
          <div className="flex flex-row items-center justify-between w-full">
            <div>
              <div className=" text-sm text-primary-color">{step.status}</div>
              {step.responsavel && (
                <div className="text-sm text-primary-color font-bold">
                  Responsável: {step.responsavel}
                </div>
              )}
            </div>
            {step.data && (
              <div className="text-sm text-primary-color text-right">
                {step.data}
                <br /> {step.hora}
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}
