import { Router } from 'express'

const pageRouter = Router()

pageRouter.get('/login', (_request, response) => {
  response.render('login')
})

pageRouter.get('/home', (_request, response) => {
  response.render('home')
})

export { pageRouter }