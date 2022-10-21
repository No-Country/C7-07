import { Model } from "mongoose";
import { IReaction } from "../../../interfaces/IReaction";
import { IReactionRepository } from "../../../interfaces/IRepository";
import { ReactionModel } from "./ReactionModel";

export class ReactionRepository implements IReactionRepository {
  private readonly _repository: Model<IReaction> = ReactionModel;

  async create(userId: string, postId: string): Promise<IReaction | null> {
    try {
      const reaction = new this._repository({ owner: userId, post: postId });
      await reaction.save();
      return reaction;
    } catch (error) {
      throw error;
    }
  }

  async getOne(obj: {
    userId?: string;
    postId?: string;
  }): Promise<IReaction | null> {
    try {
      const reaction = await this._repository.findOne({
        $and: [
          { owner: { $eq: obj.userId } },
          { post: { $eq: obj.postId, $exists: true } },
        ],
      });
      return reaction;
    } catch (error) {
      throw error;
    }
  }

  async deleteOne(reaction: IReaction): Promise<IReaction> {
    try {
      const _reaction = await this._repository.findByIdAndDelete(reaction);
      return _reaction;
    } catch (error) {
      throw error;
    }
  }
}
