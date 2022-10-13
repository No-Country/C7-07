import { IPost } from "./IPost";
import { IReaction } from "./IReaction";
import { IUser } from "./IUser";
import { Token } from "./Token";

export interface IRepository {}

export interface IPostsRepository extends IRepository {
  getAllByUserId(userId: Token): Promise<Array<IPost> | null>;
  getByPostId(userId: Token, postId: Token): Promise<IPost | null>;
  createPost(
    data: IPost,
    userType: "Traveler" | "Agency"
  ): Promise<IPost | null>;
  editPost(postId: Token, data: IPost): Promise<IPost | null>;
  deleteOne(userId: Token, postId: Token): Promise<IPost | null>;
  setLike(reaction: IReaction): Promise<boolean | string>;
}

export type NewUser = Omit<IUser, "posts" | "reactions">;

export interface IUserRepository<Entity> {
  getAll(): Promise<Array<Entity> | null>;
  getById(userId: Token): Promise<Entity | null>;
  getOne(fileds: Entity): Promise<Entity | null>;
  create<NewEntity = Entity>(data: NewEntity): Promise<Entity | null>;
  edit<NewEntity = Entity>(
    userId: Token,
    data: Partial<NewEntity>
  ): Promise<NewUser | null>;
  deleteOne(userId: Token): Promise<Entity | null>;
  setLike(reaction: IReaction): Promise<boolean | string>;
  setPost(userId: Token, post: IPost): Promise<boolean | string>;
}

export interface IReactionRepository {
  create(userId: Token, postId: Token): Promise<IReaction | null>;
  getOne(obj: { userId?: string; postId?: string }): Promise<IReaction | null>;
  deleteOne(userId: string, postId: string): Promise<IReaction | null>;
}
