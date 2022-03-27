import { NextFunction, Request, Response } from "express";

export default (req: Request, res: Response, next: NextFunction) => {
    if (!req.headers['x-uid']) {
        //Implement control on database or database cache
        return res.status(401).json({
            code: res.status,
            message: 'UID not available'
        })
    } else {
        const uuid = req.headers['x-uid'] as string
        res.locals.uuid = uuid
        return next()
    }
}