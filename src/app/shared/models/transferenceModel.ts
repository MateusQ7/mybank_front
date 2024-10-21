export interface TransferenceModel {
  id?: number;
  cpfSender?: string ;
  senderName?: string;
  cpfReceiver: string;
  receiverName?: string;
  amount: number;
  paymentDescription: string;
  transferenceDate?: string;
  transferenceType: string;
}
