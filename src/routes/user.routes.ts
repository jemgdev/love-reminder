import { Router } from 'express'
import { CreateReminderUseCase } from '../core/reminder/application/create-reminder.usecase'
import { ReminderTypeOrmRepository } from '../core/reminder/infrastructure/reminder.typeorm.repository'
import { SigninUseCase } from '../core/user/application/signin.usecase';
import { UserTypeOrmRepository } from '../core/user/infrastructure/user.typeorm.repository';
import { cloudinary } from '../cloudinary';
import { RegisterCommentUseCase } from '../core/user/application/register-comment.usecase';
import { ListCommentsUseCase } from '../core/user/application/list-comments.usecase';
import { GetUserUseCase } from '../core/user/application/get-user.usecase';
import { ChangePasswordUseCase } from '../core/user/application/change-password.usecase';
import { CreateUserUseCase } from '../core/user/application/create-user.usecase';

const userRouter = Router()

const createReminderUseCase = new CreateReminderUseCase(new ReminderTypeOrmRepository())
const signinUseCase = new SigninUseCase(new UserTypeOrmRepository())
const createUserUseCase = new CreateUserUseCase(new UserTypeOrmRepository())
const getUserUseCase = new GetUserUseCase(new UserTypeOrmRepository())
const registerCommentUseCase = new RegisterCommentUseCase(new UserTypeOrmRepository())
const listCommentsUseCase = new ListCommentsUseCase(new UserTypeOrmRepository())
const changePasswordUseCase = new ChangePasswordUseCase(new UserTypeOrmRepository())

userRouter.post('/create', async (request, response, next) => {
  const { username, password } = request.body

  try {
    const isValid = await createUserUseCase.invoke({
      password,
      username
    })
  
    response.status(200).json({
      code: isValid ? 'CREATE_SUCCESS' : 'CREATE_ERROR',
      message: isValid ? 'User created' : 'Invalid user',
      data: isValid
    })
  } catch (error) {
    next(error)
  }
})

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

userRouter.post('/change-password', async (request, response, next) => {
  const { username, oldPassword, newPassword } = request.body

  try {
    const isValid = await signinUseCase.invoke({
      password: oldPassword,
      username
    })

    if (!isValid) {
      return response.status(200).json({
        code: 'UPDATE_PASSWORD_ERROR',
        message: 'User signed',
        data: false
      })
    }
  
    const isChangeSuccessful = await changePasswordUseCase.invoke({
      password: newPassword,
      username
    })

    response.status(200).json({
      code: 'UPDATE_PASSWORD',
      message: 'User password changed',
      data: isChangeSuccessful
    })
  } catch (error) {
    next(error)
  }
})

userRouter.get('/users/:username', async (request, response, next) => {
  const { username } = request.params

  try {
    const userFound = await getUserUseCase.invoke(username)
  
    response.status(200).json({
      code: userFound ? 'GET_USER' : 'GET_USER_ERROR',
      message: userFound ? 'User found' : 'User not found',
      data: {
        id: userFound?.id,
        username: userFound?.username,
        avatar: userFound?.avatar
      }
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

    //@ts-ignore
    const image = result.secure_url ?? process.env.ERROR_UPLOAD_IMAGE
    
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
  } catch (error: any) {
    if (error.message === 'Empty file') {
      const reminderCreated = await createReminderUseCase.invoke({
        description,
        image: process.env.ERROR_UPLOAD_IMAGE!,
        title,
        userId
      })
    
      response.status(201).json({
        code: 'REMINDER_CREATED_WITH_ERRORS',
        message: 'Reminder has been created with errors',
        data: reminderCreated
      })
    }
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