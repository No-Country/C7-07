import { IReaction } from "./IReaction";

export interface IPost {
  title: string;
  description: string;
  reactions: Array<IReaction>;
  media?: string;
  owner: string;
}
