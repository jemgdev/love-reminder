import { UserRepository } from "../domain/user.repository";

export class ListCommentsUseCase {
  constructor (private readonly userRepository: UserRepository) {}

  async invoke (reminderId: string) {
    try {
      const comments = await this.userRepository.getCommentsByReminderId(reminderId)

      return comments
    } catch (error) {
      console.log('Error in list comments usecase', error)
      throw new Error('Error in list comments usecase')
    }
  }
}