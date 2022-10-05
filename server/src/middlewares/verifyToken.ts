import { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken";

const keyWord = "bearer";

export const verifyToken = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const token = req.header("Authorization");
  if (!token || !token.toLowerCase().startsWith(keyWord))
    return res.status(401).json({
      type: "Error",
      message: "Missing or Invalid Token",
    });

  const key = token.substring(keyWord.length + 1);
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  const decodedToken = verify(key, process.env.PRIVATE_KEY!) as {
    userId: string;
    email: string;
    password: string;
  };
  const { userId, email, password } = decodedToken;
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore: next-line
  req.jwit = { userId, email, password };
  next();
};
