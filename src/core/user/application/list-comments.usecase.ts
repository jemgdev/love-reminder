import { UserRepository } from "../domain/user.repository";

export class ListCommentsUseCase {
  constructor (private readonly userRepository: UserRepository) {}

  async invoke (reminderId: string) {
    const comments = await this.userRepository.getCommentsByReminderId(reminderId)
    return comments
  }
}