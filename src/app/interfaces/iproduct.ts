export interface IProduct {
  trackingId: number;
  productImage: string;
  productName: string;
  customer: string;
  date: Date;
  amount: number;
  paymentMode: string;
  status: string;
  actions?: string;
}

export interface IRawProduct extends Partial<Record<keyof IProduct, any>> {
  "Tracking ID": number;
  "Product Image": string;
  "Product Name": string;
  Customer: string;
  Date: string;
  Amount: number;
  "Payment Mode": string;
  Status: string;
}
