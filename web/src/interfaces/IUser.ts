export interface IUser {
  id?: string;
  name: string;
  email: string;
  password: string;
  alias: string;
  posts: Array<string>;
  reactions: Array<string>;
  userType: string;
}
