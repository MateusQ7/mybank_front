export interface Invoice {
  id: number;
  invoiceDescription: string;
  amount: number;
  cardName: string;
  invoiceDate: Date;
  invoiceStatus: string;
  dueDate: Date;
  email: string;
}