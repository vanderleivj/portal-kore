"use client";

import { DatePickerWithRange } from "@/components/ui/date-range-picker";
import { useOrders } from "@/app/hooks/useOrders";
import { MainTable } from "@/components/main-table";

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
  } = useOrders();

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
