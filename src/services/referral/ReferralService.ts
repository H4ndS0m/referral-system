import { IConfig } from '../../config'
import { IReferral } from '../../models/referral'
import { IReferralService } from './IReferralService'
import { referralRepo } from '../../models/referral'

export const ReferralService = (config: IConfig): IReferralService => {
    const getReferralPercentage = (): number => {
        const percentage = config.referralPercentage
        return percentage
    }

    const createReferral = async (userId: string): Promise<IReferral> => {
        const referral = await referralRepo.initialize(userId)
        return referral
    }

    return {
        getReferralPercentage,
        createReferral
    }
}
