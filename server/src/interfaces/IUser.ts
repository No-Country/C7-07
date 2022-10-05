import { Token } from "./Token";
export interface IUser {
  name: string;
  email: string;
  password: string;
  alias: string;
  posts: Array<Token>;
  userType: string;
}

export interface ITraveler extends IUser {
  userType: "traveler";
}

export interface IBusiness extends IUser {
  userType: "business";
}
