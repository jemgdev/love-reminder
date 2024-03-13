import { Router } from 'express'
import { ListRemindersUseCase } from '../core/reminder/application/list-reminders.usecase'
import { ReminderTypeOrmRepository } from '../core/reminder/infrastructure/reminder.typeorm.repository'

const reminderRouter = Router()

const listRemindersUseCase = new ListRemindersUseCase(new ReminderTypeOrmRepository())

reminderRouter.get('/reminders', async (request, response) => {
  const remindersFound = await listRemindersUseCase.invoke()

  response.status(200).json({
    code: 'REMINDERS_FOUND',
    message: 'Reminders are found',
    data: remindersFound
  })
})

export { reminderRouter }