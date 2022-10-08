import { IPost } from "./IPost";
import { IUser } from "./IUser";
import { Token } from "./Token";

export interface IRepository {}

export interface IPostsRepository extends IRepository {
  getAllByUserId(userId: Token): Promise<Array<IPost> | null>;
  getByPostId(userId: Token, postId: Token): Promise<IPost | null>;
  createPost(data: IPost): Promise<IPost | null>;
  editPost(postId: Token, data: IPost): Promise<IPost | null>;
  deleteOne(userId: Token, postId: Token): Promise<IPost | null>;
}

export type NewUser = Omit<IUser, "posts" | "reactions">;

export interface IUserRepository {
  getAllUsers(): Promise<Array<IUser> | null>;
  getUserById(userId: Token): Promise<IUser | null>;
  createUser(data: NewUser): Promise<IUser | null>;
  editUser(userId: Token, data: NewUser): Promise<NewUser | null>;
  deleteOne(userId: Token): Promise<IUser | null>;
}
