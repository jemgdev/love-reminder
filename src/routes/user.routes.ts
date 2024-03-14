import { Router } from 'express'
import { CreateReminderUseCase } from '../core/reminder/application/create-reminder.usecase'
import { ReminderTypeOrmRepository } from '../core/reminder/infrastructure/reminder.typeorm.repository'
import { SigninUseCase } from '../core/user/application/signin.usecase';
import { UserTypeOrmRepository } from '../core/user/infrastructure/user.typeorm.repository';
import { cloudinary } from '../cloudinary';
import { RegisterCommentUseCase } from '../core/user/application/register-comment.usecase';
import { ListCommentsUseCase } from '../core/user/application/list-comments.usecase';

const userRouter = Router()

const createReminderUseCase = new CreateReminderUseCase(new ReminderTypeOrmRepository())
const signinUseCase = new SigninUseCase(new UserTypeOrmRepository())
const registerCommentUseCase = new RegisterCommentUseCase(new UserTypeOrmRepository())
const listCommentsUseCase = new ListCommentsUseCase(new UserTypeOrmRepository())

userRouter.post('/signin', async (request, response, next) => {
  const { username, password } = request.body

  try {
    const isValid = await signinUseCase.invoke({
      password,
      username
    })
  
    // @ts-ignore
    request.session.username = username
  
    response.status(200).json({
      code: isValid ? 'SIGNIN_SUCCESS' : 'SIGNIN_ERROR',
      message: isValid ? 'User signed' : 'Invalid user',
      data: isValid
    })
  } catch (error) {
    next(error)
  }
})

userRouter.get('/signout', async (request, response, _next) => {
  // @ts-ignore
  request.session.destroy()
  response.redirect('/login')
})

userRouter.post('/post', async (request, response, next) => {
  const {
    userId,
    title,
    description,
  } = request.body

  try {
    const result = await new Promise((resolve, reject) => {
      cloudinary.uploader.upload_stream({
        folder: 'LoveReminder'
      }, (error, result) => {
        if (error) { 
          reject(error)
        }
        resolve(result)
      })
      //@ts-ignore
      .end(request.files?.file.data)
    })
  
    // @ts-ignore
    const image = result!.secure_url
    
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
  } catch (error) {
    next(error)
  }
})

userRouter.post('/comments', async (request, response, next) => {
  const { description, reminderId, userId } = request.body

  try {
    const result = await registerCommentUseCase.invoke({
      description,
      reminderId,
      userId
    })
  
    response.status(201).json({
      code: 'COMMENT_CREATED',
      message: 'Comment has been created',
      data: result
    })
  } catch (error) {
    next(error)
  }
})

userRouter.get('/comments/:reminderId', async (request, response, next) => {
  const { reminderId } = request.params

  try {
    const result = await listCommentsUseCase.invoke(reminderId)

    response.status(201).json({
      code: 'COMMENTS_FOUND',
      message: 'Comment found',
      data: result
    })
  } catch (error) {
    next(error) 
  }
})

export { userRouter }