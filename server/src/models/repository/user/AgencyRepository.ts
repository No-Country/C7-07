import { Model, PopulateOptions } from "mongoose";
import { IUserRepository } from "../../../interfaces/IRepository";
import { IAgency } from "../../../interfaces/IUser";
import { BusinessModel } from "./AgencyModel";
import Print from "../../../utils/Print";
import { IReaction } from "../../../interfaces/IReaction";
import { IPost } from "../../../interfaces/IPost";
import { ITour } from "../../../interfaces/ITour";
import PostRepository from "../posts/PostRepository";

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
      console.log("GET_BY_ID: ", user);
      return user;
    } catch (e) {
      print.red(
        `\rError:\n + ${print.repeat(
          "-",
          10
        )} Method: getUserById in UserRepository ${print.repeat("-", 10)}\n`
      );
      throw e;
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
      console.log("GET_ONE: ", user);
      return user;
    } catch (e) {
      print.red(
        `\rError:\n + ${print.repeat(
          "-",
          10
        )} Method: getUserById in UserRepository ${print.repeat("-", 10)}\n`
      );
      throw e;
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

  async deletePost(userId: string, postId: string): Promise<boolean | void> {
    try {
      if (!postId) throw "Not PostId arguments Provided.";
      const user = await this._repository.findById(userId);
      const posts = user.posts;
      if (posts.length === 0) return false;
      console.log(posts);
      const postIdx = user.posts.findIndex((idx) => idx.toString() === postId);
      if (postIdx < 0) return false;
      posts.splice(postIdx, 1);
      console.log(posts);
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

  async setTour(
    agencyFilters: Partial<IAgency>,
    tour: ITour
  ): Promise<ITour | void> {
    try {
      const user = await this._repository.findOne({ ...agencyFilters });
      if (user) {
        user.tours.push(tour.id);
        await user.save();
      }
      console.log("SET_TOUR: ", user);

      return user as unknown as ITour;
    } catch (error) {
      throw error;
    }
  }
}

export default new AgencyRepository();
