import { NextFunction, Request, Response } from "express";
import { IMessage } from "src/interfaces/IMessage";

const KEY_WORD = "bearer";

export const verifyToken = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const token = req.header("Authorization");
  if (token && !token.toLocaleLowerCase().startsWith(KEY_WORD)) {
    return res.json({
      code: 404,
      message: "Invalid/Expired token",
      data: null,
      status: "ERROR",
    } as IMessage);
  }
  // if(!token && req.ur)
  if (!token && !(req.path === "/auth" || req.path === "/regist")) {
    return res.json({
      code: 404,
      message: "Invalid/Expired token",
      data: null,
      status: "ERROR",
    } as IMessage);
  }
  if (!token) return next();
  if (!process.env.PRIVATE_KEY)
    return res.status(404).json({
      message: "No ENV VAR PRIVATE_KEY SETTED",
      code: 404,
      data: null,
      status: "ERROR",
    } as IMessage);

  const key = token.substring(KEY_WORD.length + 1);

  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore: next-line
  req.token = key;
  return next();
};
