import { IPost } from "./IPost";
import { ITour } from "./ITour";
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

export interface IUserRepository extends IRepository {
  getAllUsers(): Promise<Array<IUser> | null>;
  getUserById(userId: Token): Promise<IUser | null>;
  getOne<Type>(fields: Type): Promise<IUser | null>;
  createUser(data: NewUser): Promise<IUser | null>;
  editUser(userId: Token, data: NewUser): Promise<NewUser | null>;
  deleteOne(userId: Token): Promise<IUser | null>;
  setPost(userId: Token, postId: Token): Promise<boolean>;
}

export interface ITourRepository extends IRepository {
  getAllTours(): Promise<Array<ITour> | null>;
  getToursByAgencyId(agencyId: Token): Promise<Array<ITour> | null>;
  getTourByAgencyId(agencyId: Token, tourId: Token): Promise<ITour | null>;
  getOne<Type>(fields: Type): Promise<ITour | null>;
  createTour(data: ITour): Promise<ITour | null>;
  editTour<NewType>(
    agencyId: Token,
    tourId: Token,
    data: NewType
  ): Promise<ITour | null>;
  deleteTour(agencyId: Token, tourId: Token): Promise<ITour | null>;
}
