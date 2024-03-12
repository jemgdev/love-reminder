import express, { Express } from 'express'
import { notFound } from './middlewares/not-found'
import { errorHandler } from './middlewares/error-handler'
import { userRouter } from './routes/user.routes'
import { pageRouter } from './routes/pages.routes'

const serverConfig = (app: Express): Express => {

  app.set('PORT', process.env.PORT || 3000)
  app.set('view engine', 'ejs')
  
  app.use(express.urlencoded({ extended: true }))
  app.use(express.json())
  app.use(express.static('public'))

  app.get('/', (_request, response) => {
    response.status(200).json({
      code: 'SUCCESS',
      message: 'Welcome to Love Reminder API v1. 👋'
    })
  })

  app.use(userRouter)
  app.use(pageRouter)
  app.use(errorHandler)
  app.use(notFound)

  

  return app
}

export { serverConfig }