import { Schema, model } from 'mongoose'
import { ITransaction } from './ITransaction'

const { String } = Schema.Types

const TransactionSchema = new Schema(
    {
        author: { type: String, required: true },
        method: {
            type: String,
            enum: ['credit-card', 'btc'],
            required: true
        },
        amount: { type: String, required: true },
        status: {
            type: String,
            enum: ['pending', 'confirmed', 'refused'],
            required: true,
            default: 'pending'
        },
        timestamp: {
            type: String,
            default: new Date().toLocaleString().split(',')[0]
        }
    },
    { versionKey: false }
)

const transactionModel = model<ITransaction>('Transaction', TransactionSchema)

export const TransactionRepo = () => {
    const initialize = async (body: ITransaction) => {
        const transaction = await transactionModel.create(body)
        return transaction
    }

    return {
        initialize
    }
}
