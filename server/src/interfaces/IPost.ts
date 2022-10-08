import { IReaction } from "./IReaction";
import { IComment } from "./IComment";

export interface IPost {
  description: string;
  creationDate: Date;
  reactions: Array<IReaction>;
  comments: Array<IComment>;
  amountReactions: number;
  amountComments: number;
  media?: string;
  owner: string;
}
