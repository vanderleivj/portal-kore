import { OrdersContent } from "@/components/orders-content";
import { Suspense } from "react";

export default function Page() {
  return (
    <Suspense fallback={<div>Carregando...</div>}>
      <OrdersContent />
    </Suspense>
  );
}
