import { ICredentials } from "../login/src/interfaces/ICredentials";
import { Token } from "../login/src/types/Token";

export class GoogleCredentials implements ICredentials {
  private _credentials?: Token;
  constructor() {
    this._credentials = process.env.GOOGLE_APPLICATION_CREDENTIALS;
  }

  get(): string | undefined {
    return this._credentials;
  }
}
