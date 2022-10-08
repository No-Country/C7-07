import { Request, Response } from "express";
import { IMessage } from "../../interfaces/IMessage";
import { NewUser } from "../../interfaces/IRepository";
import { UserRepository } from "../../models/repository/user/UserRepository";
import Print from "../../utils/Print";

const User = new UserRepository();
const print = new Print();

export const createUser = async (req: Request, res: Response) => {
  const { alias, name, userType, email, password } = req.body as NewUser;
  try {
    const user = await User.createUser({
      name,
      alias,
      email,
      password,
      userType,
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
      )}\nMethod: createUser \nContext:</controllers/user>\n${print.repeat(
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
