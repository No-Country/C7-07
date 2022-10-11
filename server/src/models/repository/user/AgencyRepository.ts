import { Model, PopulateOptions } from "mongoose";
import { IUserRepository } from "../../../interfaces/IRepository";
import { IBusiness } from "../../../interfaces/IUser";
import { BusinessModel } from "./AgencyModel";
import Print from "../../../utils/Print";
import { IReaction } from "../../../interfaces/IReaction";
import { IPost } from "../../../interfaces/IPost";

const print = new Print();

class AgencyRepository implements IUserRepository<IBusiness> {
  private _repository: Model<IBusiness> = BusinessModel;
  populateFields: PopulateOptions | PopulateOptions[] | undefined = undefined;

  async getAll(): Promise<IBusiness[]> {
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
  async getById(userId: string): Promise<IBusiness> {
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
  async getOne(fields: Partial<IBusiness>): Promise<IBusiness> {
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
  async create<NewEntity = IBusiness>(data: NewEntity): Promise<IBusiness> {
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
  async edit<NewEntity = IBusiness>(
    userId: string,
    data: Partial<NewEntity>
  ): Promise<IBusiness> {
    try {
      const updatedUser = await this._repository.findByIdAndUpdate<IBusiness>(
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

  async deleteOne(userId: string): Promise<IBusiness> {
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

export default new AgencyRepository();
