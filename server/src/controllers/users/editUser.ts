import { Request, Response } from "express";
import { IMessage } from "../../interfaces/IMessage";
import { NewUser } from "../../interfaces/IRepository";
import { UserRepository } from "../../models/repository/user/UserRepository";
import Print from "../../utils/Print";

const User = new UserRepository();
const print = new Print();

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
