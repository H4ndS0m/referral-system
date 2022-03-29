export interface IReferral {
    uid: string
    userId: string
    referrals: IReferralObject[]
    active: boolean
}

interface IReferralObject {
    code: string
}