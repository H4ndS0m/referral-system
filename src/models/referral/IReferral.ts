export interface IReferralObject {
    referreal: string
    status: string
    amount: string
    timestramp: string
}

export interface IReferral {
    uid: string
    userId: string
    referrals: IReferralObject[]
    active: boolean
}
