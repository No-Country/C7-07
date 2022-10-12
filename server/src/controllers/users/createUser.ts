import { Request, Response } from "express";
import { ITraveler } from "src/interfaces/IUser";
import { IMessage } from "../../interfaces/IMessage";
import { NewUser } from "../../interfaces/IRepository";
import TravelerRepository from "../../models/repository/user/TravelerRepository";
import Print from "../../utils/Print";

const print = new Print();

export const createUser = async (req: Request, res: Response) => {
  const { alias, name, userType, email, password } = req.body as ITraveler;
  try {
    const user = await TravelerRepository.create({
      name,
      alias,
      email,
      password,
      userType,
      countriesILike: [],
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
