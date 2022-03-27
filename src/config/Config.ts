import { IConfig } from './IConfig'

export const Config = (): IConfig => {
    return {
        port: parseInt(process.env.PORT ?? '8080'),
        referralPercentage: parseFloat(process.env.REFERRAL_PERCENTAGE ?? '0')
    }
}
