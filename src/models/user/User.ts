import { Schema, model } from 'mongoose'
import { v4 as uuidv4 } from 'uuid'
import { IUser } from './IUser'
import { createHash, randomUUID } from 'crypto'

const { String, Number, Boolean } = Schema.Types

const UserSchema = new Schema(
    {
        uid: { type: String, required: true },
        email: {
            type: String,
            required: [true, 'Please add an email'],
            unique: true
        },
        username: {
            type: String,
            required: [true, 'Please add a username'],
            unique: true
        },
        password: {
            type: String,
            required: [true, 'Please add a password']
        },
        referral: { type: String, required: true, unique: true },
        referred: { type: String, required: false },
        balance: { type: Number, default: 0 },
        active: { type: Boolean, default: true }
    },
    { versionKey: false, timestamps: false }
)

const userModel = model<IUser>('User', UserSchema)

export const UserRepo = () => {
    const initialize = async (body: IUser) => {
        const uuid = uuidv4()
        const referral = createHash('sha256')
            .update(randomUUID()).digest('hex')

        const modeledUser: IUser = {
            ...body,
            uid: uuid,
            referral: referral
        }

        const user = await userModel.create(modeledUser)
        return user
    }

    const getUserByUid = async (userId: string) => {
        const user = await userModel.findOne({ uid: userId })
        return user
    }

    const existsByReferred = async (id: string) => {
        const control = await userModel.exists({ referral: id })
        return control
    }

    return {
        initialize,
        getUserByUid,
        existsByReferred
    }
}
