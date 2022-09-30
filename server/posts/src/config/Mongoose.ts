import { Mongoose as Mongo } from "mongoose";
import { IDataBase } from "../interfaces/IDB";

const NODE_ENV = process.env.NODE_ENV;

export class Mongoose implements IDataBase {
  private _db: Mongo;
  private _onSuccess: (() => void) | undefined;
  private _onError: ((error: unknown) => void) | undefined;
  private _onClose: (() => void) | undefined;
  private _MONGO_DB_URI: string | undefined;

  constructor() {
    this._db = new Mongo();
    this._MONGO_DB_URI =
      NODE_ENV === "production"
        ? process.env.MONGO_DB_URI
        : process.env.MONGO_DB_URI_TEST;

    console.log(this._MONGO_DB_URI);

    this._onSuccess;
    this._onError;
    this._onClose;
  }

  /**
   * If MONGO_DB_URI or MONGO_DB_URI_TEST doesn't exists, the uri string is mongodb://localhost:27017/mydb
   */

  async init(): Promise<void> {
    try {
      await this._db
        .connect(this._MONGO_DB_URI || "mongodb://localhost:27017/mydb")
        .then(() => {
          this._onSuccess?.() || console.log("Connected!");
        });
    } catch (e) {
      this._onError?.(e) || console.log(e);
    }
  }
  async close(): Promise<void> {
    try {
      await this._db
        .disconnect()
        .then(() => this._onClose?.() || console.log("Disconnected!"));
    } catch (e) {
      this._onError?.(e) || console.log(e);
    }
  }
  onClose(cb: () => void): void {
    this._onClose = cb;
  }
  onError(cb: (error: unknown) => void): void {
    this._onError = cb;
  }
  onSucces(cb: () => void): void {
    this._onSuccess = cb;
  }
}
