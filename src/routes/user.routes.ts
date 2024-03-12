import { Router } from 'express'
import { CreateReminderUseCase } from '../core/reminder/application/create-reminder.usecase'
import { ReminderTypeOrmRepository } from '../core/reminder/infrastructure/reminder.typeorm.repository'
import { SigninUseCase } from '../core/user/application/signin.usecase';
import { UserTypeOrmRepository } from '../core/user/infrastructure/user.typeorm.repository';

const userRouter = Router()

const createReminderUseCase = new CreateReminderUseCase(new ReminderTypeOrmRepository())
const signinUseCase = new SigninUseCase(new UserTypeOrmRepository())

userRouter.post('/signin', async (request, response) => {
  const { username, password } = request.body

  const isValid = await signinUseCase.invoke({
    password,
    username
  })

  response.status(200).json({
    code: isValid ? 'SIGNIN_SUCCESS' : 'SIGNIN_ERROR',
    message: isValid ? 'User signed' : 'Invalid user',
    data: isValid
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