export type LoginResponse = {
  token: string,
  name: string,
  cpf: string,
  status: number,
  message: string,
  invoiceId: string,
  data?: object
}