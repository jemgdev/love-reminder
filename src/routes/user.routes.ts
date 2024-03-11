import { Router } from 'express'
import { CreateReminderUseCase } from '../core/reminder/application/create-reminder.usecase'
import { ReminderTypeOrmRepository } from '../core/reminder/infrastructure/reminder.typeorm.repository'

const userRouter = Router()

const createReminderUseCase = new CreateReminderUseCase(new ReminderTypeOrmRepository())

userRouter.post('/signin', (request, response) => {
  const { username, password } = request.body

  response.json({
    code: 'SUCCESS',
    message: 'user',
    data: {
      username,
      password
    }
  })
})

userRouter.post('/post', async (request, response) => {
  const {
    userId,
    title,
    description,
    image
  } = request.body

  const reminderCreated = await createReminderUseCase.invoke({
    description,
    image,
    title,
    userId
  })

  response.status(201).json({
    code: 'REMINDER_CREATED',
    message: 'Reminder has been created',
    data: reminderCreated
  })
})

export { userRouter }