import { ReminderRepository } from "../domain/reminder.repository";

export class ListRemindersUseCase {
  constructor (private readonly reminderRepository: ReminderRepository) {}
  
  public async invoke (take?: number) {
    try {
      const remindersFound = await this.reminderRepository.getReminders(take)

      return remindersFound
    } catch (error) {
      throw new Error('Error in list reminder usecase')
    }
    
  }
}