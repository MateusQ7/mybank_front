

export interface TransactionModel {
  id?: number;
  cpfSender: string;
  senderName?: string; 
  cpfReceiver: string;
  receiverName?: string; 
  amount: number;
  paymentDescription: string;
  transactionDate?: string;
  transactionType: string;
}