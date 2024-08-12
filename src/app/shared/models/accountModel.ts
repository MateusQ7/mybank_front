import { User } from "./userModel";

export interface Account {
    id: number,
    cpf: string,
    creditLimit: number,
    accountValue: number,
    usedLimit: number,
    user?: User
}