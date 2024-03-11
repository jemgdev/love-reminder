import { Reminder } from '../domain/reminder';
import { ReminderRepository } from '../domain/reminder.repository';
import { AppDataSource } from './data-source';
import { ReminderEntity } from './reminder.entity';
import { v4 as uuid } from 'uuid'

export class ReminderTypeOrmRepository implements ReminderRepository {
  async saveReminder({ userId, title, description, image }: { userId: string; title: string; description: string; image: string; }): Promise<Reminder> {
    const reminderRepository = AppDataSource.getRepository(ReminderEntity)
    
    const reminderSaved = await reminderRepository.save({
      description,
      id: uuid(),
      image,
      title,
      userId
    })

    return reminderSaved
  }

  async getReminderById(reminderId: string): Promise<Reminder> {
    return {
      description: '',
      id: '383',
      image: '1',
      title: '1',
      updatedAt: '1',
      uploadAt: '1',
      userId: '383'
    }
  }
}