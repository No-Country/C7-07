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
      return null;
    }
  }

  async getOne(userId: string, postId: string): Promise<IReaction | null> {
    try {
      const reaction = await this._repository.findOne({
        owner: userId,
        post: postId,
      });
      return reaction;
    } catch (error) {
      return null;
    }
  }

  async deleteOne(userId: string, postId: string): Promise<IReaction> {
    try {
      const reaction = await this._repository.findOneAndDelete({
        owner: userId,
        post: postId,
      });
      return reaction;
    } catch (error) {
      return null;
    }
  }
}
