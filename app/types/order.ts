export interface OrderItem {
  ProductionOrderId: string;
  OrderFulFilledBy: string;
  ProductId: string;
  ProductDescription: string;
  MeasureUnit1: string;
  MeasureUnit2: string;
  QuantityUnit1: number;
  QuantityUnit2: number;
  QtyAlreadyProduced: number;
  ProductionStatus: string;
  UnitaryPrice: number;
  TotalPrice: number;
}

export interface Order {
  OrderId: string;
  Date: string;
  DeliveryDate: string;
  ReschedulingDate: string;
  CustomerName: string;
  CarrierName: string;
  PickingOrderStatus: string;
  SellersName: string;
  ProductionOrders: string;
  OrderStatus: string;
  CustomerPickup: string;
  PaymentCondition: string;
  FreightType: string;
  OrderNotes: string;
  Items: OrderItem[];
  OrderNumberMP: string;
  OrderTotal: string;
}

export interface OrderListResponse {
  result: Order[];
  hasNext: boolean;
  pageSize: number;
  Itens: number;
  totalPages: number;
  totalOrders: number;
}
