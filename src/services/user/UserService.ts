import { IUser } from '../../models/user'
import { IUserService } from './IUserService'
import { userRepo } from '../../models'
import { v4 as uuidv4 } from 'uuid'
import { createHash, randomUUID } from 'crypto'
import bcrypt from 'bcrypt'

export default (): IUserService => {
    const hashingPassword = async (password: string) => {
        const salts = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password, salts)
        return hashedPassword
    }

    const createUser = async (body: IUser): Promise<IUser> => {
        const uuid = uuidv4()
        const referral = createHash('sha256')
            .update(randomUUID()).digest('hex')
            const hashedPassword = await hashingPassword(body.password)

        const modeledBody: IUser = {
            ...body,
            uid: uuid,
            password: hashedPassword,
            referral: referral
        }

        const user = await userRepo.initialize(modeledBody)
        return user
    }

    return {
        createUser
    }
}
