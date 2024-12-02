require('dotenv').config()
import { CreateUserUseCase } from "./src/core/user/application/create-user.usecase";
import { UserTypeOrmRepository } from "./src/core/user/infrastructure/user.typeorm.repository";
import { AppDataSource } from "./src/data-source";

AppDataSource.getInstance().initialize().then(async () => {
  console.log('Database is connected successfuly')
  const userRepository = new UserTypeOrmRepository()
  const createUser = new CreateUserUseCase(userRepository)

  const result = await createUser.invoke({
    username: 'valentina',
    password: 'test'
  })

  console.log(result)
}).catch((error) => console.log(error))



