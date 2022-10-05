import { Model } from "mongoose";
import { UserModel } from "./UserModel";
import { IUser } from "../../../interfaces/IUser";
import { IUserRepository, NewUser } from "../../../interfaces/IRepository";
import Print from "../../../utils/Print";

const print = new Print();

export class UserRepository implements IUserRepository {
  private _repository: Model<IUser> = UserModel;

  async createUser({
    name,
    email,
    alias,
    password,
    userType,
  }: NewUser): Promise<IUser | null> {
    try {
      const user = new this._repository({
        name,
        email,
        alias,
        password,
        posts: [],
        userType,
      });
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
  async getUserById(userId: string): Promise<IUser | null> {
    try {
      const user = await this._repository.findById(userId);
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

  async getOne<Type>(fields: Type): Promise<IUser | null> {
    try {
      const user = await this._repository.findOne(fields);
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

  async editUser(userId: string, data: NewUser): Promise<NewUser | null> {
    try {
      await this._repository.findByIdAndUpdate<NewUser>(userId, data);
      return data;
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

  async getAllUsers(): Promise<IUser[] | null> {
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

  async deleteOne(userId: string): Promise<IUser | null> {
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
}
