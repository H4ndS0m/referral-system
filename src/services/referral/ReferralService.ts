import { IConfig } from '../../config'
import { IReferralService } from './IReferralService'

export const ReferralService = (config: IConfig): IReferralService => {
    const getReferralPercentage = (): number => {
        const percentage = config.referralPercentage
        return percentage
    }

    return {
        getReferralPercentage
    }
}
