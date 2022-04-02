import { IUser } from '../../models/user'

export interface IUserService {
    createUser(body: IUser): Promise<IUser>,
    getUser?(): Promise<IUser>
    updateUser?(): Promise<void>
    deleteUser?(): Promise<void>
}
