import { UserRepository } from "../domain/user.repository";

export class CreateUserUseCase {
  constructor (private readonly userRepository: UserRepository) {}

  public async invoke ({ username, password }: { username: string, password: string }) {
    try {
      return await this.userRepository.createUser({
        username,
        password
      }) 
    } catch (error) {
      console.log('Error in get user usecase', error)
      throw new Error('Error in get user usecase');
    }
  }
}