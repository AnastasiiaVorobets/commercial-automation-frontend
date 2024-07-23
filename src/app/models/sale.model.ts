export interface Sale {
  _id: string;
  product: string[];
  user: string;
  saleDate: Date;
  deliveryDate: Date;
  quantity: number;
  totalAmount: number;
}
