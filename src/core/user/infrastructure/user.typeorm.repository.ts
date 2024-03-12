import { AppDataSource } from "../../../data-source";
import { UserRepository } from "../domain/user.repository";
import { UserEntity } from "./user.entity";

export class UserTypeOrmRepository implements UserRepository {
  async signin({ username, password }: { username: string; password: string; }): Promise<boolean> {
    const reminderRepository = AppDataSource.getRepository(UserEntity)
    
    const userFound = await reminderRepository.findOne({
      where: {
        username
      }
    })

    if (!userFound) {
      return false
    }

    if (userFound.password !== password) {
      return false
    }

    return true
  }
}