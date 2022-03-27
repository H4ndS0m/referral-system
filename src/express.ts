import express from 'express'
import { IConfig } from './config'
import routes from './routes'

export default (config: IConfig) => {
    const app = express()

    app.use(express.json())

    // Uid check request middleware

    routes(app, config)

    return app
}
