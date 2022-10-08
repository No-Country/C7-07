import { IReaction } from "./IReaction";
import { IComment } from "./IComment";

export interface IPost<Ref = string> {
  description: string;
  creationDate: Date;
  reactions: Array<IReaction>;
  comments: Array<IComment>;
  amountReactions: number;
  amountComments: number;
  media?: string;
  owner: Ref;
}
