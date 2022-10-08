import { IUser } from "./IUser";
import { Token } from "./Token";

export interface IComment {
  owner: Token;
  responses: Array<IUser>;
}
