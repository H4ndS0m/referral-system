import { Schema, model } from 'mongoose'
import { IReferral, IReferralObject } from './IReferral'
import { v4 as uuidv4 } from 'uuid'

const { String, Boolean } = Schema.Types

const referralObjectSchema = new Schema(
    {
        referral: {
            type: String,
            required: true
        },
        status: {
            type: String,
            required: true,
            enum: ['pending', 'paid']
        },
        amount: {
            type: String,
            required: true
        },
        timestamp: {
            type: String,
            default: new Date().toLocaleString().split(',')[0]
        }
    },
    { _id: true }
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
            required: false,
            unique: false
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

    const updateReferralsByUserId = async (userId: string, body: IReferralObject) => {
        const referral = await referralModel.updateOne({ userId: userId }, { $push: { referrals: body } })
        return referral
    }

    return {
        initialize,
        updateReferralsByUserId
    }
}
