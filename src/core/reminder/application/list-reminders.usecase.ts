import { ReminderRepository } from "../domain/reminder.repository";

export class ListRemindersUseCase {
  constructor (private readonly reminderRepository: ReminderRepository) {}
  
  public async invoke () {
    const remindersFound = await this.reminderRepository.getReminders()

    return remindersFound
  }
}