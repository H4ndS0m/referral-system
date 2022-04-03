import { ITransaction } from '../../models/transaction'

export interface ITransactionService{
    createTransaction(body: ITransaction, id: string): Promise<ITransaction>
}
