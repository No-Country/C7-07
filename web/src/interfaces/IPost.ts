import { IComment } from "./IComment";
import { IReaction } from "./IReaction";
import { IUser } from "./IUser";

export interface IPost {
  id: string;
  description?: string;
  creationDate: Date;
  reactions: Array<IReaction>;
  comments: Array<IComment>;
  amountReactions: number;
  amountComments: number;
  media?: string;
  owner: IUser;
}
