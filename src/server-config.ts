import express, { Express } from 'express'
import session from 'express-session'
import fileUpload from 'express-fileupload'
import { notFound } from './middlewares/not-found'
import { errorHandler } from './middlewares/error-handler'
import { userRouter } from './routes/user.routes'
import { pageRouter } from './routes/pages.routes'
import { reminderRouter } from './routes/reminder.routes'

const serverConfig = (app: Express): Express => {

  app.set('PORT', process.env.PORT || 3000)
  app.set('view engine', 'ejs')
  
  app.use(session({
    secret: process.env.SECRET_SESSION!,
    resave: false,
    saveUninitialized: true
  }))
  app.use(express.json())
  app.use(express.urlencoded({ extended: true }))
  app.use(express.static('public'))
  app.use(fileUpload())

  app.get('/', (_request, response) => {
    response.status(200).json({
      code: 'SUCCESS',
      message: 'Welcome to Love Reminder API v1. 👋'
    })
  })

  app.use('/api/', userRouter)
  app.use('/api/', reminderRouter)
  app.use(pageRouter)
  app.use(errorHandler)
  app.use(notFound)

  

  return app
}

export { serverConfig }