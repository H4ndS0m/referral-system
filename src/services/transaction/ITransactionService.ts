import { ITransaction } from '../../models/transaction'

export interface ITransactionService {
    createTransaction(body: ITransaction): Promise<ITransaction>
    withdrawRewardTransaction(id: string): Promise<void>
}
