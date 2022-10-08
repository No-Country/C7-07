import { Request, Response } from "express";
import { IMessage } from "../../interfaces/IMessage";
import { NewUser } from "../../interfaces/IRepository";
import { UserRepository } from "../../models/repository/user/UserRepository";
import Print from "../../utils/Print";

const User = new UserRepository();
const print = new Print();

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
