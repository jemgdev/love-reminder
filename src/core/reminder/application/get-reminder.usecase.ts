import { ReminderRepository } from "../domain/reminder.repository";

export class GetReminderUseCase {
  constructor (private readonly reminderRepository: ReminderRepository) {}
  
  public async invoke (reminderId: string) {
    const reminderFound = await this.reminderRepository.getReminderById(reminderId)

    return reminderFound
  }
}