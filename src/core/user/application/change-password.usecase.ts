import { UserRepository } from "../domain/user.repository";

export class ChangePasswordUseCase {
  constructor (private readonly userRepository: UserRepository) {}

  async invoke ({ username, password }: { username: string, password: string }) {
    try {
      const isValid = await this.userRepository.updatePassword({
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