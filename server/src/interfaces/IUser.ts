import { Token } from "./Token";
export interface IUser {
  id?: string;
  name: string;
  email: string;
  password: string;
  alias: string;
  posts: Array<Token>;
  reactions: Array<Token>;
  userType: string;
}

export interface ITraveler extends IUser {
  userType: "traveler";
}

export interface IBusiness extends IUser {
  userType: "business";
}
