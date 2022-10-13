import { IReaction } from "./IReaction";
import { IComment } from "./IComment";

export interface IPost<Ref = string> {
  id?: string;
  description: string;
  creationDate: Date;
  reactions: Array<IReaction | string>;
  comments: Array<IComment>;
  amountReactions: number;
  amountComments: number;
  media?: string;
  owner: Ref;
}
