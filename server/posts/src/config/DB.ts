import { IDataBase } from "../interfaces/IDB";

export class DataBase implements IDataBase {
  private _db: IDataBase;
  constructor(dataBaseRepo: IDataBase) {
    this._db = dataBaseRepo;
  }

  async init(): Promise<void> {
    await this._db.init();
  }
  async close(): Promise<void> {
    await this._db.close();
  }
  onClose(cb: () => void): void {
    this._db.onClose(cb);
  }
  onError(cb: (error: unknown) => void): void {
    this._db.onError(cb);
  }
  onSucces(cb: () => void): void {
    this._db.onSucces(cb);
  }
}
