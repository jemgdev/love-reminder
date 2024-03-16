import { Router } from 'express'
import { ListRemindersUseCase } from '../core/reminder/application/list-reminders.usecase'
import { ReminderTypeOrmRepository } from '../core/reminder/infrastructure/reminder.typeorm.repository'
import { GetReminderUseCase } from '../core/reminder/application/get-reminder.usecase'

const reminderRouter = Router()

const listRemindersUseCase = new ListRemindersUseCase(new ReminderTypeOrmRepository())
const getReminderUseCase = new GetReminderUseCase(new ReminderTypeOrmRepository())

reminderRouter.get('/reminders', async (request, response, next) => {
  const { take } = request.query

  try {
    const takeNumber = take ? Number(take) : undefined
    const remindersFound = await listRemindersUseCase.invoke(takeNumber)

    response.status(200).json({
      code: 'REMINDERS_FOUND',
      message: 'Reminders are found',
      data: remindersFound
    })
  } catch (error) {
    next(error)
  }
})

reminderRouter.get('/reminders/:id', async (request, response, next) => {
  const { id } = request.params

  try {
    const reminderFound = await getReminderUseCase.invoke(id)

    response.status(200).json({
      code: 'REMINDER_FOUND',
      message: 'Reminder found',
      data: reminderFound
    })
  } catch (error) {
    next(error)
  }  
})

export { reminderRouter }