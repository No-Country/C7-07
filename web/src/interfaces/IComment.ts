import { IUser } from "./IUser";

export interface IComment {
  owner: string;
  responses: Array<IUser>;
}
