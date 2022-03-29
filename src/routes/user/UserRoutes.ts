import { Request, Response } from "express"
import { IReferralService } from "../../services"
import { IUserService } from "../../services/user/IUserService"

export default (userService: IUserService, 
        referralService: IReferralService
    ) => {
    const createUser = async (req: Request, res: Response) => {
        const user = await userService.createUser(req.body)
        await referralService.createReferral(req.headers['x-uid'] as string)
        return res.status(201).json(user)
    }

    return {
        createUser
    }
}