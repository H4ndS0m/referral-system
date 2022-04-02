export interface IUser {
    _id?: string
    uid: string
    email: string
    username: string
    password: string
    referral: string
    referred: string
    balance: number
    active: boolean
}
