import { Reminder } from '../domain/reminder';
import { ReminderRepository } from '../domain/reminder.repository';
import { AppDataSource } from '../../../data-source';
import { ReminderEntity } from './reminder.entity';
import { v4 as uuid } from 'uuid'
import { LessThanOrEqual } from 'typeorm';

export class ReminderTypeOrmRepository implements ReminderRepository {
  async getReminders(take?: number, page?: number): Promise<Reminder[]> {
    const reminderRepository = AppDataSource.getInstance().getRepository(ReminderEntity)
    const [ lastReminder ] = await reminderRepository.find({
      order: {
        uploadAt: 'ASC'
      },
      take: 1
    })

    if (!lastReminder) {
      return []
    }

    const skip = page ? (page - 1) * (take || 1) : undefined
    const remindersFound = await reminderRepository.find({
      where: {
        id: LessThanOrEqual(lastReminder.id)
      },
      order: {
        uploadAt: 'DESC'
      },
      take: take ?? undefined,
      skip
    })

    return remindersFound
  }
  async saveReminder({ userId, title, description, image }: { userId: string; title: string; description: string; image: string; }): Promise<Reminder> {
    const reminderRepository = AppDataSource.getInstance().getRepository(ReminderEntity)
    
    const reminderSaved = await reminderRepository.save({
      description,
      id: uuid(),
      image,
      title,
      userId,
      uploadAt: new Date().toISOString()
    })

    return reminderSaved
  }

  async getReminderById(reminderId: string): Promise<any | null> {
    const reminderRepository = AppDataSource.getInstance().getRepository(ReminderEntity)

    const reminderFound = await reminderRepository.findOne({
      where: {
        id: reminderId
      },
      relations: {
        user: true
      },
      select: {
        description: true,
        id: true,
        image: true,
        title: true,
        updatedAt: true,
        uploadAt: true,
        user: {
          username: true,
          avatar: true
        }
      }
    })

    return reminderFound
  }
}