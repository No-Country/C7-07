import { Request, Response } from "express";
import { IUser } from "src/interfaces/IUser";
import { IMessage } from "../../interfaces/IMessage";
import {
  AgencyRepository,
  TravelerRepository,
} from "../../models/repository/user";
import Print from "../../utils/Print";

const print = new Print();

export const getAllUsers = async (
  req: Request & { token: string; payload: IUser },
  res: Response
) => {
  const { userType } = req.payload;
  try {
    const users = await (userType === "traveler"
      ? TravelerRepository
      : AgencyRepository
    ).getAll();
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
