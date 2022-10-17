import { Model, PopulateOptions } from "mongoose";
import { IUserRepository } from "../../../interfaces/IRepository";
import { IAgency } from "../../../interfaces/IUser";
import { BusinessModel } from "./AgencyModel";
import Print from "../../../utils/Print";
import { IReaction } from "../../../interfaces/IReaction";
import { IPost } from "../../../interfaces/IPost";
import { ITour } from "../../../interfaces/ITour";

const print = new Print();

class AgencyRepository implements IUserRepository<IAgency> {
  private _repository: Model<IAgency> = BusinessModel;
  populateFields: PopulateOptions | PopulateOptions[] | undefined = undefined;

  async getAll(): Promise<IAgency[]> {
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
  async getById(userId: string): Promise<IAgency> {
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

  async getManyByTourId(tourId: string): Promise<IAgency[]> {
    try {
      const agencies = this._repository.find({ tours: tourId });
      return agencies;
    } catch (error) {
      throw error;
    }
  }

  async getOne(fields: Partial<IAgency>): Promise<IAgency> {
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
  async create<NewEntity = IAgency>(data: NewEntity): Promise<IAgency> {
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
  async edit<NewEntity = IAgency>(
    userId: string,
    data: Partial<NewEntity>
  ): Promise<IAgency> {
    try {
      const updatedUser = await this._repository.findByIdAndUpdate<IAgency>(
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

  async deleteOne(userId: string): Promise<IAgency> {
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
        user.reactions.splice(reactionIdx, 1);
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
  async setTour(userId: string, tour: ITour): Promise<string | boolean> {
    try {
      const user = await this._repository.findById(userId);
      user.tours.push(tour);
      await user.save();
      return true;
    } catch (error) {
      throw error;
    }
  }
}

export default new AgencyRepository();
