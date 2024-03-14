import { ReminderRepository } from "../domain/reminder.repository";

export class GetReminderUseCase {
  constructor (private readonly reminderRepository: ReminderRepository) {}
  
  public async invoke (reminderId: string) {
    try {
      const reminderFound = await this.reminderRepository.getReminderById(reminderId)

      return reminderFound
    } catch (error) {
      throw new Error('Error in get reminder usecase')
    }
  }
}