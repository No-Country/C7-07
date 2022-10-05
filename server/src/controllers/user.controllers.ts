import { Request, Response } from "express";
import { IMessage } from "../interfaces/IMessage";
import { NewUser } from "../interfaces/IRepository";
import { IUser } from "../interfaces/IUser";
import { UserRepository } from "../models/repository/user/UserRepository";
import Print from "../utils/Print";

const User = new UserRepository();
const print = new Print();

export const createUser = async (req: Request, res: Response) => {
  const { alias, name, userType, email, password } = req.body as Omit<
    IUser,
    "posts"
  >;
  try {
    const user = await User.createUser({
      alias,
      name,
      userType,
      email,
      password,
    });
    res.status(200).json({
      code: 200,
      message: "User founded",
      data: user,
      status: "OK",
    } as IMessage);
  } catch (error) {
    print.red(
      `\rError:\n${print.repeat(
        "-",
        10
      )}\nMethod: getUserByid \nContext:</controllers/user>\n${print.repeat(
        "-",
        10
      )}`
    );
    res.status(500).json({
      message: error,
      code: 500,
      data: null,
      status: "ERROR",
    } as IMessage);
  }
};

export const getUserById = async (req: Request, res: Response) => {
  const { userId } = req.params;
  try {
    const user = await User.getUserById(userId);
    res.status(200).json({
      code: 200,
      message: "User founded",
      data: user,
      status: "OK",
    } as IMessage);
  } catch (error) {
    print.red(
      `\rError:\n${print.repeat(
        "-",
        10
      )}\nMethod: getUserByid \nContext:</controllers/user>\n${print.repeat(
        "-",
        10
      )}`
    );
    res.status(500).json({
      message: `Error ocurred.`,
      code: 500,
      data: null,
      status: "ERROR",
    } as IMessage);
  }
};

export const getAllUsers = async (req: Request, res: Response) => {
  try {
    const users = await User.getAllUsers();
    res.status(200).json({
      code: 200,
      message: `Users founded: ${users?.length ?? 0}`,
      data: users,
      status: "OK",
    } as IMessage);
  } catch (error) {
    print.red(
      `\rError:\n${print.repeat(
        "-",
        10
      )}\nMethod: getAllUsers \nContext:</controllers/user>\n${print.repeat(
        "-",
        10
      )}`
    );
    res.status(500).json({
      message: `Error ocurred.`,
      code: 500,
      data: null,
      status: "ERROR",
    } as IMessage);
  }
};

export const editUser = async (req: Request, res: Response) => {
  const { userId } = req.params;
  const { alias, name, userType, email, password } = req.body as NewUser;
  try {
    const user = await User.editUser(userId, {
      alias,
      name,
      userType,
      email,
      password,
    });
    res.status(200).json({
      code: 200,
      message: "User edited",
      data: user,
      status: "OK",
    } as IMessage);
  } catch (error) {
    print.red(
      `\rError:\n${print.repeat(
        "-",
        10
      )}\nMethod: editUser \nContext:</controllers/user>\n${print.repeat(
        "-",
        10
      )}`
    );
    res.status(500).json({
      message: `Error ocurred.`,
      code: 500,
      data: null,
      status: "ERROR",
    } as IMessage);
  }
};

export const removeUser = async (req: Request, res: Response) => {
  const { userId } = req.params;
  try {
    const user = await User.deleteOne(userId);
    res.status(200).json({
      code: 200,
      message: "User deleted",
      data: user,
      status: "OK",
    } as IMessage);
  } catch (error) {
    print.red(
      `\rError:\n${print.repeat(
        "-",
        10
      )}\nMethod: removeUser \nContext:</controllers/user>\n${print.repeat(
        "-",
        10
      )}`
    );
    res.status(500).json({
      message: `Error ocurred.`,
      code: 500,
      data: null,
      status: "ERROR",
    } as IMessage);
  }
};
