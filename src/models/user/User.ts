import { Schema, model } from 'mongoose'
import { v4 as uuidv4 } from 'uuid'
import { IUser } from './IUser'
import { createHash } from 'crypto'

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
            required: [true, 'Please add a password'],
        },
        referral: { type: String, required: true, unique: true },
        balance: { type: Number, default: 0 },
        active: { type: Boolean, default: true }
    },
    { versionKey: false, timestamps: false }
)

const userModel = model<IUser>('User', UserSchema)

export const UserRepo = () => {
    const initialize = async (body: IUser) => {
        const uuid = uuidv4()
        const referral = createHash('sha256').digest('hex')

        const modeledUser: IUser = {
            ...body,
            uid: uuid,
            referral: referral
        }

        const user = await userModel.create(modeledUser)
        return user
    }

    return {
        initialize
    }
}