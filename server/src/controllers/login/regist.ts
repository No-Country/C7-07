import { Request, Response } from "express";
import { UserRepository } from "../../models/repository/user/UserRepository";
import { sign } from "jsonwebtoken";
import { IMessage } from "../../interfaces/IMessage";
import Print from "../../utils/Print";
import { NewUser } from "../../interfaces/IRepository";
import { encryptPassword } from "../../utils/encryptPassword";

const User = new UserRepository();
const print = new Print();

export const regist = async (req: Request, res: Response) => {
  if (!process.env.PRIVATE_KEY) throw "NO ENV VAR SETTED";
  const { password, alias, email, name, userType } = req.body as NewUser;
  const payload = {
    password,
    alias,
    email,
    name,
    userType,
  };
  console.log({ key: process.env.PRIVATE_KEY, body: req.body, payload });
  try {
    const user = await User.createUser(payload);
    console.log(user);
    const token = sign({ ...payload, id: user.id }, process.env.PRIVATE_KEY, {
      expiresIn: "5min",
    });
    res.status(200).json({
      code: 200,
      data: token,
      message: "User succesfully created!",
      status: "OK",
    } as IMessage<string>);
  } catch (error) {
    print.red(
      `\rError:\n${print.repeat(
        "-",
        10
      )}\nMethod: regist \nContext:</controllers/>\n${print.repeat("-", 10)}`
    );
    res.status(500).json({
      message: error,
      code: 500,
      data: null,
      status: "ERROR",
    } as IMessage);
  }
};
