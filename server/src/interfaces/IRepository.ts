import { IPost } from "./IPost";
import { Token } from "./Token";

export interface IRepository {}

export interface IPostsRepository extends IRepository {
  getAllByUserId(userId: Token): Promise<Array<IPost> | null>;
  getByPostId(userId: Token, postId: Token): Promise<IPost | null>;
  createPost(data: IPost): Promise<IPost | null>;
  editPost(postId: Token, data: IPost): Promise<IPost | null>;
  deleteOne(userId: Token, postId: Token): Promise<IPost | null>;
}
