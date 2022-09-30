import { Token } from "../types/Token";

export default interface IResponse {
  msg: string;
  state: number;
  ok: boolean;
  token: Token;
}

export interface IBadResponse extends IResponse {
  token: undefined;
}
