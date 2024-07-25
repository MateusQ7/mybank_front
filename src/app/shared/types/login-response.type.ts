export type LoginResponse = {
    token: string,
    name: string,
    status: number,
    message: string,
    data?: object
}