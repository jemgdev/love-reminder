import { DataSource } from "typeorm";
import { ReminderEntity } from "./core/reminder/infrastructure/reminder.entity";
import { UserEntity } from "./core/user/infrastructure/user.entity";

export const AppDataSource = new DataSource({
  type: "mysql",
  host: process.env.DATABASE_HOST,
  port: Number(process.env.DATABASE_PORT),
  username: process.env.DATABASE_USERNAME,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE_NAME,
  synchronize: true,
  logging: false,
  entities: [ReminderEntity, UserEntity],
  subscribers: [],
  migrations: [],
})