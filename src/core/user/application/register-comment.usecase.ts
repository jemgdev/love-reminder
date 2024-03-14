import { UserRepository } from "../domain/user.repository";

export class RegisterCommentUseCase {
  constructor (private readonly userRepository: UserRepository) {}
  
  async invoke ({ userId, reminderId, description }: { userId: string; reminderId: string; description: string }) {
    try {
      const result = await this.userRepository.createCommentByPostAndUser({
        description,
        reminderId,
        userId
      })
  
      return result
    } catch (error) {
      throw new Error('Error in register comment usecase')
    }
  }
}