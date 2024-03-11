import express from 'express'
import { serverConfig } from './server-config'

const app = express()
const server = serverConfig(app)

server.listen(server.get('PORT'), () => {
  console.log(`Love reminder init on port ${server.get('PORT')}`)
})