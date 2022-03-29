import { Schema, model } from 'mongoose'
import { IReferral } from './IReferral'
import { v4 as uuidv4 } from 'uuid'

const { String, Boolean } = Schema.Types

const referralObjectSchema = new Schema(
    {
        code: { type: String, required: true, unique: true }
    }
)

const referralSchema = new Schema(
    {
        uid: { type: String, required: true },
        userId: { 
            type: String, 
            required: [true, ''], 
            unique: true 
        },
        referrals: { 
            type: [referralObjectSchema], 
            required: true, 
            default: [] 
        },
        active: { type: Boolean, default: true }
    },
    { versionKey: false }
)

const referralModel = model<IReferral>('Referral', referralSchema)

export const ReferralRepo = () => {
    const initialize = async (userId: string) => {
        const uuid = uuidv4()

        const referral = await referralModel.create({
            uid: uuid,
            userId: userId
        })
        return referral
    }

    return {
        initialize
    }
}