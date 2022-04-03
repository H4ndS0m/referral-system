import { IConfig } from '../../config'
import { referralRepo } from '../../models/referral'
import { IReferralService } from './IReferralService'

export default (config: IConfig): IReferralService => {
    const getReferralPercentage = (): number => {
        const percentage = config.referralPercentage
        return percentage
    }

    const createReferral = async (userId: string) => {
        const referral = await referralRepo.initialize(userId)
        return referral
    }

    return {
        getReferralPercentage,
        createReferral
    }
}
