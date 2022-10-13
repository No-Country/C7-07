import { IPost } from "./IPost";
import { IUser } from "./IUser";

export interface IReaction {
  id: string;
  owner: IUser | string;
  post: IPost | string;
}
