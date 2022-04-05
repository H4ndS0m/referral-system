import { Schema, model } from 'mongoose'

import { IUser } from './IUser'

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
        const user = await userModel.create(body)
        return user
    }

    const getUserByUid = async (id: string) => {
        const user = await userModel.findOne({ uid: id })
        return user
    }

    const getReferredByUid = async (id: string) => {
        const referred = await userModel.findOne({ uid: id }, { referred: 1 })
        return referred?.referred
    }

    const existsByReferred = async (id: string) => {
        const control = await userModel.exists({ referral: id })
        return control
    }

    const existsByUid = async (id: string) => {
        const control = await userModel.exists({ uid: id })
        return control
    }

    return {
        initialize,
        getUserByUid,
        getReferredByUid,
        existsByReferred,
        existsByUid
    }
}
