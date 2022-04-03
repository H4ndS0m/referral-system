export interface IReferralObject {
    referral: string
    status: string
    amount: string
    timestamp?: string
}

export interface IReferral {
    uid: string
    userId: string
    referrals: IReferralObject[]
    active: boolean
}
