import { IReaction } from "./IReaction";
import { ITour } from "./ITour";
export interface IUser {
  id?: string;
  name: string;
  email: string;
  password: string;
  alias: string;
  posts: Array<string>;
  reactions: Array<IReaction | string>;
  userType: string;
  profile: string;
  country: string;
}
type Genre = "M" | "F" | "U";
export interface ITraveler extends IUser {
  userType: "Traveler";
  countriesILike: Array<string>;
  birthDate: string;
  genre: Genre;
}

export interface IAgency extends IUser {
  userType: "Agency";
  tours: Array<ITour | string>;
  description?: string;
  contacts: {
    whatsapp: string;
  };
}
