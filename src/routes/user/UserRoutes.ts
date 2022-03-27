import { Request, Response } from "express"
import { IUserService } from "../../services/user/IUserService"

export default (userService: IUserService) => {
    const createUser = async (_: Request, res: Response) => {
        const user = await userService.createUser(_.body)
        return res.status(201).json(user)
    }

    return {
        createUser
    }
}