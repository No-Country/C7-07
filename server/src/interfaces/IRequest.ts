import { IPost } from "./IPost";
import { Token } from "./Token";

export type RequestBodyCreatePost = Omit<
  IPost,
  | "amountReactions"
  | "amountComments"
  | "reactions"
  | "comments"
  | "creationDate"
>;
export type UrlParams = {
  postId: Token;
  userId: Token;
};
