import { DataSource } from "typeorm";
import { ReminderEntity } from "./reminder.entity";

export const AppDataSource = new DataSource({
  type: "mysql",
  host: "localhost",
  port: 3306,
  username: "root",
  password: "qwer5256",
  database: "love-reminder",
  synchronize: true,
  logging: true,
  entities: [ReminderEntity],
  subscribers: [],
  migrations: [],
})