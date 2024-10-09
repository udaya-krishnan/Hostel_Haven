export interface PaymentUseCase{
    fetchPayment(id:string):Promise<any|null>
    addamount(hostId:string,amount:number):Promise<any|null>
}