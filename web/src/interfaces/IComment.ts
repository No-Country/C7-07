import { IUser } from "./IUser";

export interface IComment {
  id: string;
  owner: string;
  responses: Array<IUser>;
}
