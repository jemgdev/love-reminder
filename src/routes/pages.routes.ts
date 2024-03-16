import { Router } from 'express'
import { ListRemindersUseCase } from '../core/reminder/application/list-reminders.usecase'
import { ReminderTypeOrmRepository } from '../core/reminder/infrastructure/reminder.typeorm.repository'
import { authGuard } from '../middlewares/unauthorized'
import { GetUserUseCase } from '../core/user/application/get-user.usecase'
import { UserTypeOrmRepository } from '../core/user/infrastructure/user.typeorm.repository'
import { GetReminderUseCase } from '../core/reminder/application/get-reminder.usecase'
import moment from 'moment'
import { ListCommentsUseCase } from '../core/user/application/list-comments.usecase'
moment.locale('es')

const pageRouter = Router()

const listRemindersUseCase = new ListRemindersUseCase(new ReminderTypeOrmRepository())
const getReminderUseCase = new GetReminderUseCase(new ReminderTypeOrmRepository())
const getUserUseCase = new GetUserUseCase(new UserTypeOrmRepository())
const listCommentsUseCase = new ListCommentsUseCase(new UserTypeOrmRepository())

pageRouter.get('/login', (request, response) => {
  // @ts-ignore
  request.session.destroy()
  response.render('login')
})

pageRouter.get('/home', authGuard, async (request, response) => {
  try {
    const remindersFound = await listRemindersUseCase.invoke()
    // @ts-ignore
    const userFound = await getUserUseCase.invoke(request.session.username)
      
    response.render('home', { reminders: remindersFound, user: userFound })
  } catch (error) {
    console.log('Error in page router')
    response.render('error')
  }
})

pageRouter.get('/reminders/:id', authGuard, async (request, response) => {
  const { id } = request.params
  
  try {
    const commentsFound = await listCommentsUseCase.invoke(id)
    const reminderFound = await getReminderUseCase.invoke(id)
    // @ts-ignore
    const userFound = await getUserUseCase.invoke(request.session.username)

    response.render('reminder', { reminder: { ...reminderFound, uploadAt: moment(reminderFound.uploadAt).fromNow() }, user: userFound, comments: commentsFound })
  } catch (error) {
    response.render('error')
  }
})

pageRouter.get('/upload', authGuard, async (request, response) => {
  try {
    // @ts-ignore
    const userFound = await getUserUseCase.invoke(request.session.username)
    response.render('create-reminder', { user: userFound })
  } catch (error) {
    console.log('Error in page router')
    response.render('error')
  }
})

export { pageRouter }