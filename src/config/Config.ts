import 'dotenv/config'
import { IConfig } from './IConfig'

export const Config = (): IConfig => {
    return {
        port: parseInt(process.env.PORT ?? '8080'),
        mongodb: process.env.MONGO_DB_URL ?? '',
        referralPercentage: parseFloat(process.env.REFERRAL_PERCENTAGE ?? '0'),
        referralSecret: process.env.REFERRAL_SECRET ?? '15874369'
    }
}
