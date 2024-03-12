export interface UserRepository {
  signin ({ username, password }: { username: string, password: string }): Promise<boolean>
}