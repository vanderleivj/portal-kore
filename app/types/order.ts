export interface Order {
  ProductionOrderId: string;
  OrderId: string;
  Date: string;
  DeliveryDate: string;
  ReschedulingDate: string;
  CarrierName: string;
  OrderStatus: string;
  CustomerName: string;
  ProductId: string;
  ProductDescription: string;
  MeasureUnit1: string;
  MeasureUnit2: string;
  QuantityUnit1: number;
  QuantityUnit2: number;
  QtyAlreadyProduced: number;
  ProductionStatus: string;
  PickingOrderStatus: string;
  OrderNotes: string;
}

export interface OrderListResponse {
  result: Order[];
  hasNext: boolean;
  pageSize: number;
  Records: number;
  totalPages: number;
}
