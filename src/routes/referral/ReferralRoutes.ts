import { Request, Response } from 'express'
import { IReferralService } from '../../services'

export default (referralService: IReferralService) => {
    const getReferralPercentage = (_: Request, res: Response) => {
        const percentage = referralService.getReferralPercentage()
        return res.status(200).json(percentage)
    }

    return {
        getReferralPercentage
    }
}
