export interface TransactionModel {
  id: number;
  senderAccountId: number;
  receiverAccountId: number;
  amount: number;
  paymentDescription: string;
  transactionDate: string; 
  transactionType: string; 
}