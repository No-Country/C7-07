import { Token } from "./Token";
import { IPost } from "./IPost";

export interface IReaction {
  owner: Token;
  posts: IPost;
}
