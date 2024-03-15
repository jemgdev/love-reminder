import { Column, Entity, ManyToOne, OneToMany, OneToOne, PrimaryColumn } from "typeorm"
import { ReminderEntity } from '../../reminder/infrastructure/reminder.entity';
import { UserEntity } from './user.entity';

@Entity()
export class CommentEntity {
  @PrimaryColumn({
    type: 'varchar',
    length: 255
  })
  id: string

  @Column({
    type: 'varchar',
    length: 100,
  })
  userId: string
  
  @Column({
    type: 'varchar',
    length: 255
  })
  reminderId: string

  @Column({
    type: 'varchar',
    length: 255,
    collation: 'utf8mb4_unicode_ci'
  })
  description: string

  @Column({
    type: 'varchar',
    default: new Date().toISOString()
  })
  createdAt: string

  @ManyToOne(() => ReminderEntity, (reminder) => reminder.comments)
  reminder: ReminderEntity

  @ManyToOne(() => UserEntity, (user) => user.comments)
  user: UserEntity
}