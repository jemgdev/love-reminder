import { ReminderRepository } from "../domain/reminder.repository";

export class CreateReminderUseCase {
  constructor (private readonly reminderRepository: ReminderRepository) {}

  public async invoke ({ 
    userId,
    title,
    description,
    image 
  }: { 
    userId: string,
    title: string,
    description: string,
    image: string 
  }) {
    const reminder = await this.reminderRepository.saveReminder({
      description,
      image,
      title,
      userId
    })

    return reminder
  }
}