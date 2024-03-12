import { Reminder } from "./reminder";

export interface ReminderRepository {
  saveReminder ({ userId, title, description, image }: { userId: string, title: string, description: string, image: string}): Promise<Reminder>
  getReminderById (reminderId: string): Promise<Reminder | null>
}