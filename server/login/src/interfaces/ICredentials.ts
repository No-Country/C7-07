import { Token } from "../types/Token";

export interface ICredentials {
  credentials?: Token;
  get(): Token | undefined;
}
