import { Request, Response } from 'express'
import { ITransactionService } from '../../services'

export default (transactionService: ITransactionService) => {
    const createTransaction = async (req: Request, res: Response) => {
        const uuid = req.headers['x-uid'] as string
        const transaction = await transactionService.createTransaction(req.body, uuid)
        return res.status(200).json({
            id: transaction._id,
            code: res.statusCode,
            message: 'A new transaction has been created'
        })
    }

    return {
        createTransaction
    }
}
