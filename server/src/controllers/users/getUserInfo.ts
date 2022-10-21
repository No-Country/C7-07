import { Request, Response } from "express";
import { IUser } from "../../interfaces/IUser";
import { IMessage } from "../../interfaces/IMessage";
import {
  AgencyRepository,
  TravelerRepository,
} from "../../models/repository/user";
import Print from "../../utils/Print";

const print = new Print();

export const getUserInfo = async (
  req: Request & { token: string; payload: IUser },
  res: Response
) => {
  const { id, userType } = req.payload;
  try {
    const user =
      userType === "Agency"
        ? await AgencyRepository.getById(id)
        : await TravelerRepository.getById(id);

    console.log(user);
    res.status(200).json({
      code: 200,
      message: user ? "User founded" : "No user founded",
      data: user,
      status: "OK",
    } as IMessage);
  } catch (error) {
    print.red(
      `\rError:\n${print.repeat(
        "-",
        10
      )}\nMethod: getUserByid \nContext:</controllers/user/getUserInfo>\n${print.repeat(
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
