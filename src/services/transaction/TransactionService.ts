import { ITransactionService } from './ITransactionService'
import { userRepo, transactionRepo, referralRepo } from '../../models'
import { ITransaction } from '../../models/transaction'
import { IConfig } from '../../config'

export default (config: IConfig): ITransactionService => {
    const rewardCalculation = (amount: string) => {
        const numberAmount = parseFloat(amount)
        const reward = (numberAmount * 0.01) / (config.referralPercentage / 100)
        return reward.toFixed(2)
    }

    const createTransaction = async (body: ITransaction, id: string): Promise<ITransaction> => {
        const transaction = await transactionRepo.initialize(body)
        const referred = await userRepo.getReferredByUid(id) as string
        await referralRepo.updateReferralsByUserId(referred, {
            referral: referred,
            amount: rewardCalculation(transaction.amount),
            status: 'pending'
        })
        return transaction
    }

    return {
        createTransaction
    }
}
