import { User } from "./user"

export interface UserRepository {
  signin ({ username, password }: { username: string, password: string }): Promise<boolean>
  getUserByUsername (username: string): Promise<User | null>
}