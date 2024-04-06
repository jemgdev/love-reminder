import { ReminderRepository } from "../domain/reminder.repository";

export class ListRemindersUseCase {
  constructor (private readonly reminderRepository: ReminderRepository) {}
  
  public async invoke (take?: number, page?: number) {
    try {
      const remindersFound = await this.reminderRepository.getReminders(take, page)

      return remindersFound
    } catch (error) {
      console.log('Error in list reminder usecase', error)
      throw new Error('Error in list reminder usecase')
    }
    
  }
}