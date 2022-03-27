import createApp from './express'
import { Config } from './config'

const config = Config()

const express = createApp(config).listen(config.port, () => {
    console.log(`Server listening on port: ${config.port}`)
})

process.on('SIGINT', function () {
    express.close()
})
