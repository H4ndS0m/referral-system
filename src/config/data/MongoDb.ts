import mongoose from 'mongoose'
import color from 'colors'
import { IConfig } from '../IConfig'

export default async (config: IConfig) => {
    const client = await mongoose.connect(config.mongodb)
    console.log(color.cyan(`MongoDb connection at: ${client.connection.host}`))
    return client
} 