import express from 'express'
import { IConfig, Config } from './config'
import routes from './routes'
import auth from './middleware/authMiddleware'
import mongoConnection from './config/data/MongoDb'

const createApp = (config: IConfig) => {
    const app = express()

    app.use(express.json())
    app.use(auth)

    routes(app, config)

    return app
}

export default async () => {
    const config = Config()

    await mongoConnection(config)

    const app = createApp(config).listen(config.port, () => {
        console.log(`Server listening on port: ${config.port}`)
    })

    process.on('SIGINT', function () {
        app.close()
    })
}
