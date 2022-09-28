import { ILoggeableEntity } from "../interfaces/ILoggeableEntity";
import { initializeApp, App, applicationDefault } from "firebase-admin/app";
import { Firestore } from "firebase-admin/firestore";
import { Token } from "../types/Token";
import { IUserData } from "../interfaces/IUserData";
import { Email } from "../../../shared/utils";

const app = initializeApp({
  credential: applicationDefault(),
});

export class FireBase implements ILoggeableEntity {
  private _app: App;
  private _db: Firestore;
  constructor() {
    this._app = app;
    this._db = new Firestore({
      keyFilename: "../config/firebase.json",
    });
  }

  async SignIn(id: Token): Promise<Token> {
    const user = await this._db.doc(`users/${id}`).get();
    const token = user.exists ? user.id : undefined;
    return token;
  }
  async SignUp(userData: IUserData): Promise<boolean> {
    const email = new Email(userData.email);
    if (!email.validate()) return false;
    console.log(email.value);
    await this._db.collection("users/usernames").add(userData);
    if (await this.existUser("", email.value)) return false;
    else this._db.collection("users").doc(email.value).set(userData);
    return true;
  }

  async existUser(field: string, data: any): Promise<boolean> {
    const user = await this._db.collection(`users`).doc(data).get();
    return user.exists;
  }
}
