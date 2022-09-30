import { IPost } from "./IPost";
import { Token } from "./Token";

export type RequestBody = Exclude<IPost, "owner" & "reactions">;
export type UrlParams = {
  postId: Token;
  userId: Token;
};
