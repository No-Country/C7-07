import { Token } from "../types/Token";
import { IUserData } from "./IUserData";

export interface ILoggeableEntity {
  SignIn(id: Token): Promise<Token>;
  SignUp(userData: IUserData): Promise<boolean>;
}
