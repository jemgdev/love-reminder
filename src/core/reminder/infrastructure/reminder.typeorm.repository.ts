import { Reminder } from '../domain/reminder';
import { ReminderRepository } from '../domain/reminder.repository';

export class ReminderTypeOrmRepository implements ReminderRepository {
  async saveReminder({ userId, title, description, image }: { userId: string; title: string; description: string; image: string; }): Promise<Reminder> {
    return {
      description: '',
      id: '29',
      image: '1',
      title: '1',
      updatedAt: '1',
      uploadAt: '1',
      userId: '83'
    }
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