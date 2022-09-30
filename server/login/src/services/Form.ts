import { ILoggeableEntity } from "../interfaces/ILoggeableEntity";
import { Token } from "../types/Token";

export class Form implements ILoggeableEntity {
  SignIn(): Token {
    return "";
  }
  SignUp(): boolean {
    return true;
  }
}
