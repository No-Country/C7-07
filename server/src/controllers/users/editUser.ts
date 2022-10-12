import { Request, Response } from "express";
import { IUser } from "../../interfaces/IUser";
import { IMessage } from "../../interfaces/IMessage";
import {
  AgencyRepository,
  TravelerRepository,
} from "../../models/repository/user";
import Print from "../../utils/Print";

const print = new Print();

export const editUser = async (
  req: Request & { token: string; payload: IUser },
  res: Response
) => {
  const { userType, id } = req.payload;
  const payload = req.body;
  try {
    const user = await (userType === "Traveler"
      ? TravelerRepository
      : AgencyRepository
    ).edit(id, payload);
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
