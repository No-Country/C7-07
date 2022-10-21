import { Request, Response } from "express";
import { sign } from "jsonwebtoken";
import { IMessage } from "../../interfaces/IMessage";
import Print from "../../utils/Print";
import {
  AgencyRepository,
  TravelerRepository,
} from "../../models/repository/user";
import { IUser } from "../../interfaces/IUser";

const print = new Print();

export const regist = async (req: Request, res: Response) => {
  if (!process.env.PRIVATE_KEY) throw "NO ENV VAR SETTED";
  const payload = req.body as IUser;
  try {
    await (payload.userType === "Traveler"
      ? TravelerRepository
      : AgencyRepository
    ).create(payload);
    res.status(200).json({
      code: 200,
      data: null,
      message: "User succesfully created!",
      status: "OK",
    } as IMessage<null>);
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
