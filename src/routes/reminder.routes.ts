import { Router } from 'express'
import { ListRemindersUseCase } from '../core/reminder/application/list-reminders.usecase'
import { ReminderTypeOrmRepository } from '../core/reminder/infrastructure/reminder.typeorm.repository'
import { GetReminderUseCase } from '../core/reminder/application/get-reminder.usecase'

const reminderRouter = Router()

const listRemindersUseCase = new ListRemindersUseCase(new ReminderTypeOrmRepository())
const getReminderUseCase = new GetReminderUseCase(new ReminderTypeOrmRepository())

reminderRouter.get('/reminders', async (request, response) => {
  const remindersFound = await listRemindersUseCase.invoke()

  response.status(200).json({
    code: 'REMINDERS_FOUND',
    message: 'Reminders are found',
    data: remindersFound
  })
})

reminderRouter.get('/reminders/:id', async (request, response) => {
  const { id } = request.params

  const reminderFound = await getReminderUseCase.invoke(id)

  response.status(200).json({
    code: 'REMINDER_FOUND',
    message: 'Reminder found',
    data: reminderFound
  })
})

export { reminderRouter }