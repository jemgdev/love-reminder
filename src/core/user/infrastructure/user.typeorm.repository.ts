import { AppDataSource } from "../../../data-source";
import { User } from "../domain/user";
import { UserRepository } from "../domain/user.repository";
import { CommentEntity } from "./comment.entity";
import { UserEntity } from "./user.entity";
import { v4 as uuid } from 'uuid'

export class UserTypeOrmRepository implements UserRepository {
  async createUser({ username, password }: { username: string; password: string; }): Promise<boolean> {
    const reminderRepository = AppDataSource.getRepository(UserEntity)

    const userId = uuid()

    try {
      await reminderRepository.query('START TRANSACTION;')
      await reminderRepository.query('INSERT INTO user_entity (id, username, password) VALUES (?,?,?);', [userId, username, password])
      await reminderRepository.query('INSERT INTO reminder_entity (id, userId, title, description, image, uploadAt, updatedAt) VALUES (?,?,?,?,?,?,?);', [uuid(), userId, 'Default title', 'Default description', 'https://res.cloudinary.com/josueemg/image/upload/v1710456041/qaflhuz6rchfryfjp1fo.jpg', new Date().toISOString(), null])
      JSON.parse('HOLA')
      await reminderRepository.query('COMMIT;')
      
      return true
    } catch (error) {
      await reminderRepository.query('ROLLBACK;')
      await reminderRepository.query('COMMIT;')
      return false
    }
  }

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

  async updatePassword({ username, password }: { username: string, password: string }): Promise<boolean> {
    const reminderRepository = AppDataSource.getRepository(UserEntity)
    
    const userFound = await reminderRepository.findOne({
      where: {
        username
      }
    })

    if (!userFound) {
      return false
    }

    userFound.password = password

    await reminderRepository.save(userFound)

    return true
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