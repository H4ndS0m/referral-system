import { IReferral } from "../../models/referral"

export interface IReferralService {
    getReferralPercentage(): number
    createReferral(userId: string): Promise<IReferral>
}
