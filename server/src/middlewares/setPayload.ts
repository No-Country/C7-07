import { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken";
import { IUser } from "../interfaces/IUser";

export const setPayload = (
  req: Request & { token: string; payload: IUser },
  res: Response,
  next: NextFunction
) => {
  const { token } = req;
  if (token) {
    const verifiedToken = verify(token, process.env.PRIVATE_KEY) as IUser;

    req.payload = verifiedToken;
  }
  next();
};
