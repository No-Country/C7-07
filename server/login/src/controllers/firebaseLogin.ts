import { Request, Response } from "express";
import IResponse, { IBadResponse } from "../interfaces/IResponse";
import { FireBase } from "../models/FireBase";

let response: IResponse | IBadResponse;

const firebase = new FireBase();

export default async function firebaseLogin(req: Request, res: Response) {
  const { id } = req.params;
  const token = firebase.SignIn(id);

  if (!token) {
    response = {
      msg: "Bad request: User doesn't exists.",
      ok: false,
      state: 403,
      token: id,
    };
  } else {
    response = {
      msg: "Welcome!",
      ok: true,
      state: 200,
      token: id,
      // };
    };
  }
  res.status(response.state).json(response);
}
