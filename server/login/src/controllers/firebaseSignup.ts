import { Request, Response } from "express";
import { IUserData } from "../interfaces/IUserData";
import { FireBase } from "../models/FireBase";

const firebase = new FireBase();

export default async function frebaseSignup(req: Request, res: Response) {
  const userData = req.body as IUserData;
  const bool = await firebase.SignUp(userData);
  res.json({ greeting: "Post", data: bool });
}
