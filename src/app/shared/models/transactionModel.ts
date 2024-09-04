import { Account } from "./accountModel";
import { User } from "./userModel";

export interface TransactionModel {
  id: number;
  senderCpf: string;
  senderName: string; // Adicione o nome do remetente
  receiverCpf: string;
  receiverName: string; // Adicione o nome do destinatário
  amount: number;
  paymentDescription: string;
  transactionDate: string;
  transactionType: string;
}