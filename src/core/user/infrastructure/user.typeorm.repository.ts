import { AppDataSource } from "../../../data-source";
import { Comment } from "../domain/comment";
import { User } from "../domain/user";
import { UserRepository } from "../domain/user.repository";
import { CommentEntity } from "./comment.entity";
import { UserEntity } from "./user.entity";
import { v4 as uuid } from 'uuid'

export class UserTypeOrmRepository implements UserRepository {
  async getCommentsByReminderId(reminderId: string): Promise<any[]> {
    const reminderRepository = AppDataSource.getRepository(CommentEntity)

    const commentsFound = await reminderRepository.find({
      where: {
        reminderId
      }, 
      relations: {
        user: true,
      },
      select: {
        user: {
          username: true
        }
      },
      order: {
        createdAt: 'asc'
      }
    })

    return commentsFound
  }

  async createCommentByPostAndUser({ userId, reminderId, description }: { userId: string; reminderId: string; description: string }): Promise<string> {
    const reminderRepository = AppDataSource.getRepository(CommentEntity)

    await reminderRepository.save({
      userId,
      reminderId,
      id: uuid(),
      description,
      createdAt: new Date().toISOString()
    })

    return 'Comment registered'
  }

  async getUserByUsername(username: string): Promise<User | null> {
    const reminderRepository = AppDataSource.getRepository(UserEntity)
    
    const userFound = await reminderRepository.findOne({
      where: {
        username
      }
    })

    return userFound
  }

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