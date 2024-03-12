import { Column, Entity, PrimaryColumn } from "typeorm"

@Entity()
export class UserEntity {
  @PrimaryColumn({
    type: 'varchar',
    length: 255
  })
  id: string

  @Column({
    type: 'varchar',
    length: 100,
    unique: true
  })
  username: string

  @Column({
    type: 'varchar',
    length: 255
  })
  password: string
  
  @Column({
    type: 'varchar',
    length: 255,
    nullable: true
  })
  avatar: string
}