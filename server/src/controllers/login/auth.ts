import { Request, Response } from "express";
import { IMessage } from "../../interfaces/IMessage";
import { sign } from "jsonwebtoken";
import {
  AgencyRepository,
  TravelerRepository,
} from "../../models/repository/user";
import { IAgency, ITraveler, IUser } from "../../interfaces/IUser";

export const login = async (
  req: Request & { token: string; payload: IUser },
  res: Response
) => {
  const { email, password } = req.query as Pick<IUser, "email" | "password">;
  const { payload, token } = req;
  let correctPayload;
  try {
    if (req.payload && token) {
      correctPayload = {
        name: payload.name,
        alias: payload.alias,
        email: payload.email,
        password: payload.password,
        userType: payload.userType,
        id: payload.id,
      };
    } else {
      correctPayload = { email, password };
    }
    if ((!token || !payload) && (!email || !password)) throw "Bad Credentials";
    let user;
    if (payload?.userType === "Traveler")
      user = await TravelerRepository.getOne(correctPayload as ITraveler);
    else if (payload?.userType === "Agency")
      user = await AgencyRepository.getOne(correctPayload as IAgency);
    else
      user =
        (await TravelerRepository.getOne(correctPayload as ITraveler)) ||
        (await AgencyRepository.getOne(correctPayload as IAgency));

    if (!user) throw "Not user founded";

    const newToken = sign(
      {
        ...correctPayload,
        alias: user.alias,
        name: user.name,
        userType: user.userType,
        id: user.id,
      },
      process.env.PRIVATE_KEY
    );

    res.status(200).json({
      code: 200,
      data: newToken ?? null,
      message: "User succesfully logged!",
      status: "OK",
    } as IMessage<string>);
  } catch (error) {
    res.status(500).json({
      message: error,
      code: 404,
      data: null,
      status: "ERROR",
    } as IMessage);
  }
};
