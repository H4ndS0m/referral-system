import { Application } from 'express'
import { IConfig } from '../config'
import { ReferralService } from '../services'
import ReferralRoute from './referral/ReferralRoute'

export default (app: Application, config: IConfig) => {
    const referralService = ReferralService(config)

    const routes = ReferralRoute(referralService)

    app.get('/referral/percentage', routes.getReferralPercentage)
}
