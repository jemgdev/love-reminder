import { Column, Entity, PrimaryColumn } from 'typeorm'

@Entity()
export class ReminderEntity {
  @PrimaryColumn({
    type: 'varchar',
    length: 255
  })
  id: string

  @Column({
    type: 'varchar',
    length: 255
  })
  userId: string

  @Column({
    type: 'varchar',
    length: 255
  })
  title: string

  @Column({
    type: 'varchar',
    length: 255
  })
  description: string

  @Column({
    type: 'varchar',
    length: 255
  })
  image: string

  @Column({
    type: 'varchar',
    length: 255,
    default: new Date().toISOString()
  })
  uploadAt: string

  @Column({
    type: 'varchar',
    length: 255,
    default: null
  })
  updatedAt: string
}