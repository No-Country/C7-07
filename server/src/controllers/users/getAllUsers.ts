import { Request, Response } from "express";
import { IMessage } from "../../interfaces/IMessage";
import { NewUser } from "../../interfaces/IRepository";
import { UserRepository } from "../../models/repository/user/UserRepository";
import Print from "../../utils/Print";

const User = new UserRepository();
const print = new Print();

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
