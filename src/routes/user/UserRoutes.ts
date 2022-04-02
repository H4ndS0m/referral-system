import { Request, Response } from 'express'
import { IReferralService } from '../../services'
import { IUserService } from '../../services/user/IUserService'
import { IUser, userRepo } from '../../models'

export default (userService: IUserService,
    referralService: IReferralService
) => {
    const createUser = async (req: Request, res: Response) => {
        const user = await userService.createUser(req.body)
        await referralService.createReferral(user.uid)
        return res.status(201).json(user)
    }

    const createUserWithReferral = async (req: Request, res: Response) => {
        const referred = req.params.referredId

        if (referred)
            if (!await userRepo.existsByReferred(referred))
                return res.status(400).json({
                    code: res.statusCode,
                    message: 'The referral code is not present'
                })

        const modeledBody: IUser = { ...req.body, referred: referred }

        const user = await userService.createUser(modeledBody)
        await referralService.createReferral(user.referral)
        return res.status(201).json({
            id: user._id,
            code: res.statusCode,
            message: 'A new user has been created'
        })
    }

    return {
        createUser,
        createUserWithReferral
    }
}
