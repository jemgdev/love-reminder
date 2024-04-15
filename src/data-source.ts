import { DataSource } from "typeorm";
import { ReminderEntity } from "./core/reminder/infrastructure/reminder.entity";
import { UserEntity } from "./core/user/infrastructure/user.entity";
import { CommentEntity } from "./core/user/infrastructure/comment.entity";
import { Constants } from "./contants";

export class AppDataSource {
  private static database: DataSource

  private constructor () {}

  public static getInstance(): DataSource {
    if (!AppDataSource.database) {
      AppDataSource.database = new DataSource({
        type: "mysql",
        host: Constants.DATABASE_HOST,
        port: Number(Constants.DATABASE_PORT),
        username: Constants.DATABASE_USERNAME,
        password: Constants.DATABASE_PASSWORD,
        database: Constants.DATABASE_NAME,
        charset: 'utf8mb4',
        synchronize: true,
        logging: false,
        entities: [ReminderEntity, UserEntity, CommentEntity],
        subscribers: [],
        migrations: [],
      })
    }

    return AppDataSource.database
  }
}