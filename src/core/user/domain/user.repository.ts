import { User } from "./user"

export interface UserRepository {
  signin ({ username, password }: { username: string, password: string }): Promise<boolean>
  getUserByUsername (username: string): Promise<User | null>
  createCommentByPostAndUser ({ userId, reminderId, description }: { userId: string, reminderId: string, description: string }): Promise<string>
  getCommentsByReminderId (reminderId: string): Promise<any[]>
  updatePassword({ username, password }: { username: string, password: string }): Promise<boolean>
  createUser ({ username, password }: { username: string, password: string }): Promise<boolean>
}