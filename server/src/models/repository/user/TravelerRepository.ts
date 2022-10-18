import { Model, PopulateOptions } from "mongoose";
import { TravelerModel } from "./TravelerModel";
import { ITraveler } from "../../../interfaces/IUser";
import { IUserRepository, NewUser } from "../../../interfaces/IRepository";
import Print from "../../../utils/Print";
import { IReaction } from "../../../interfaces/IReaction";
import { IPost } from "../../../interfaces/IPost";

const print = new Print();

class TravelerRepository implements IUserRepository<ITraveler> {
  private _repository: Model<ITraveler> = TravelerModel;
  populateFields: PopulateOptions | PopulateOptions[] | undefined = undefined;

  async getAll(): Promise<ITraveler[]> {
    try {
      const users = await this._repository.find();
      return users;
    } catch (e) {
      print.red(
        `\rError:\n + ${print.repeat(
          "-",
          10
        )} Method: getAllUsers in UserRepository ${print.repeat("-", 10)}\n`
      );
      return null;
    }
  }
  async getById(userId: string): Promise<ITraveler> {
    try {
      const user = await this._repository.findById(userId);
      if (user && this.populateFields) user.populate(this.populateFields);
      return user;
    } catch (e) {
      print.red(
        `\rError:\n + ${print.repeat(
          "-",
          10
        )} Method: getUserById in UserRepository ${print.repeat("-", 10)}\n`
      );
      return null;
    }
  }

  async getOne(fields: Partial<ITraveler>): Promise<ITraveler> {
    try {
      const user = await this._repository.findOne(fields);
      if (user && this.populateFields) user.populate(this.populateFields);
      return user;
    } catch (e) {
      print.red(
        `\rError:\n + ${print.repeat(
          "-",
          10
        )} Method: getUserById in UserRepository ${print.repeat("-", 10)}\n`
      );
      return null;
    }
  }
  async create<NewEntity = ITraveler>(data: NewEntity): Promise<ITraveler> {
    try {
      const user = new this._repository(data);
      await user.save();
      return user || null;
    } catch (e) {
      print.blue(e);
      print.red(
        `\rError:\n + ${print.repeat(
          "-",
          10
        )} Method: createUser in UserRepository ${print.repeat("-", 10)}\n`
      );
      if (e) throw e;
      return null;
    }
  }
  async edit<NewEntity = ITraveler>(
    userId: string,
    data: Partial<NewEntity>
  ): Promise<NewUser> {
    try {
      const updatedUser = await this._repository.findByIdAndUpdate<NewUser>(
        userId,
        data,
        { new: true }
      );
      return updatedUser;
    } catch (e) {
      print.red(
        `\rError:\n + ${print.repeat(
          "-",
          10
        )} Method: editUser in UserRepository ${print.repeat("-", 10)}\n`
      );
      return null;
    }
  }

  async deleteOne(userId: string): Promise<ITraveler> {
    try {
      const user = await this._repository.findByIdAndDelete(userId);
      return user;
    } catch (e) {
      print.red(
        `\rError:\n + ${print.repeat(
          "-",
          10
        )} Method: deleteOne in UserRepository ${print.repeat("-", 10)}\n`
      );
      return null;
    }
  }

  async deletePost(userId: string, postId: string): Promise<boolean | void> {
    try {
      if (!postId) throw "Not PostId arguments Provided.";
      const user = await this._repository.findById(userId);
      const posts = user.posts;
      if (posts.length === 0) return false;
      const postIdx = user.posts.findIndex((idx) => idx === postId);
      if (postIdx < 0) return false;
      posts.splice(postIdx, 1);
      await user.save();
    } catch (error) {
      throw error;
    }
  }

  async setLike(reaction: IReaction): Promise<string | boolean> {
    try {
      let msg;
      const user = await this._repository.findById(reaction.owner);
      if (user.reactions.includes(reaction.id)) {
        const reactionIdx = user.reactions.indexOf(reaction.id);
        user.reactions.splice(reactionIdx);
        msg = "remove";
      } else {
        user.reactions.push(reaction);
        msg = "add";
      }
      await user.save();
      return msg;
    } catch (error) {
      print.red(error);
      return false;
    }
  }
  async setPost(
    userId: string,
    post: IPost<string>
  ): Promise<string | boolean> {
    try {
      const user = await this._repository.findById(userId);
      user.posts.push(post.id);
      await user.save();
      return true;
    } catch (error) {
      return false;
    }
  }
}

export default new TravelerRepository();
