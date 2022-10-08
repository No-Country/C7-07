import { NextFunction, Request, Response } from "express";

const keyWord = "bearer";

export const verifyToken = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const token = req.header("Authorization");
  if (!token || !token.toLowerCase().startsWith(keyWord)) return next();
  if (!process.env.PRIVATE_KEY)
    return res.status(404).json({
      type: "Error",
      message: "No ENV VAR PRIVATE_KEY SETTED",
    });

  const key = token.substring(keyWord.length + 1);
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore: next-line
  req.token = key;
  return next();
};
