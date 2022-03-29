import { NextFunction, Request, Response } from "express";
import { userRepo } from "../models";

export default async (req: Request, res: Response, next: NextFunction) => {
    if (!req.headers['x-uid']) {
        return res.status(401).json({
            code: res.statusCode,
            message: 'UID not available'
        })
    } else {
        const uuid = req.headers['x-uid'] as string
        const user = await userRepo.getUserByUid(uuid)
        if(!user){
            return res.status(403).json({
                code: res.statusCode,
                message: 'You are not authorized'
            })
        }else{
            res.locals.uuid = uuid
            return next()
        }
    }
}