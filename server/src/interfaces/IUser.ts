import { IReaction } from "./IReaction";
import { Token } from "./Token";
export interface IUser {
  id?: string;
  name: string;
  email: string;
  password: string;
  alias: string;
  posts: Array<Token>;
  reactions: Array<IReaction | string>;
  userType: string;
}

export interface ITraveler extends IUser {
  userType: "traveler";
  countriesILike: Array<string>;
}

export interface IBusiness extends IUser {
  userType: "business";
  contacts: {
    whatsapp: string;
  };
}
