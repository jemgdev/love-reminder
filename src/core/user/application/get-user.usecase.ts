import { UserRepository } from "../domain/user.repository";

export class GetUserUseCase {
  constructor (private readonly userRepository: UserRepository) {}

  public async invoke (username: string) {
    try {
      return await this.userRepository.getUserByUsername(username) 
    } catch (error) {
      console.log('Error in get user usecase', error)
      throw new Error('Error in get user usecase');
    }
  }
}