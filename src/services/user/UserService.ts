import { IUser } from '../../models/user'
import { IUserService } from './IUserService'
import { userRepo } from '../../models'

export const UserService = (): IUserService => {
    const createUser = async (body: IUser): Promise<IUser> => {
        const user = await userRepo.initialize(body)
        return user
    }

    return {
        createUser
    }
}
