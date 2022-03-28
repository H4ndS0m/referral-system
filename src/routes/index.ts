import { Application } from 'express'
import { IConfig } from '../config'
import { ReferralService } from '../services'
import { UserService } from '../services/user/UserService'
import ReferralRoutes from './referral/ReferralRoutes'
import UserRoutes from './user/UserRoutes'

export default (app: Application, config: IConfig) => {
    const referralService = ReferralService(config)
    const userService = UserService()

    const referral = ReferralRoutes(referralService)
    const user = UserRoutes(userService, referralService)

    app.get('/referral/percentage', referral.getReferralPercentage)

    app.post('/users', user.createUser)
}
