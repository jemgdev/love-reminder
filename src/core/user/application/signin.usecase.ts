import { UserRepository } from "../domain/user.repository";

export class SigninUseCase {
  constructor (private readonly userRepository: UserRepository) {}

  async invoke ({ username, password }: { username: string, password: string }) {
    try {
      const isValid = await this.userRepository.signin({
        password,
        username
      })
  
      return isValid
    } catch (error) {
      console.log('Error in signin usecase', error)
      throw new Error('Error in signin usecase')
    }
  }
}