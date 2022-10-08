import { Request, Response } from "express";
import { UserRepository } from "../../models/repository/user/UserRepository";
import { IMessage } from "../../interfaces/IMessage";
import { IUser } from "../../interfaces/IUser";
import { verify, sign } from "jsonwebtoken";
import { decryptPassword } from "../../utils/decryptPassword";
import Print from "../../utils/Print";

const User = new UserRepository();
const print = new Print();

export const login = async (
  req: Request & { token: string },
  res: Response
) => {
  let payload;
  const { email, password } = req.query as Pick<IUser, "email" | "password">;
  const { token } = req;

  try {
    if (token) {
      const { email, id, password, alias, name, userType } = verify(
        token,
        process.env.PRIVATE_KEY
      ) as {
        password: string;
        alias: string;
        email: string;
        name: string;
        userType: string;
        id: string;
      };
      payload = { email, id, password, alias, name, userType };
    } else {
      payload = { email, password };
    }
    console.log(payload);
    const user = await User.getOne(payload);

    const newToken = sign(
      {
        ...payload,
        alias: user.alias,
        name: user.name,
        userType: user.userType,
        id: user.id,
      },
      process.env.PRIVATE_KEY,
      {
        expiresIn: "5min",
      }
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
