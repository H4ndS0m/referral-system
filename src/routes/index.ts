import { Application } from 'express'
import { IConfig } from '../config'
import UserService from '../services/user/UserService'
import ReferralService from '../services/referral/ReferralService'
import ReferralRoutes from './referral/ReferralRoutes'
import UserRoutes from './user/UserRoutes'
import TransactionService from '../services/transaction/TransactionService'
import TransactionRoutes from './transaction/TransactionRoutes'

export default (app: Application, config: IConfig) => {
    const referralService = ReferralService(config)
    const userService = UserService()
    const transactionService = TransactionService(config)

    const referral = ReferralRoutes(referralService)
    const user = UserRoutes(userService, referralService)
    const transaction = TransactionRoutes(transactionService)

    app.get('/referral/percentage', referral.getReferralPercentage)

    app.post('/users', user.createUser)
    app.post('/users/:referredId', user.createUserWithReferral)

    app.post('/transactions', transaction.createTransaction)


}
