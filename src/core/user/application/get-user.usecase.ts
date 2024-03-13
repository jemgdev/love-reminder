import { UserRepository } from "../domain/user.repository";

export class GetUserUseCase {
  constructor (private readonly userRepository: UserRepository) {}

  public async invoke (username: string) {
    return await this.userRepository.getUserByUsername(username)
  }
}