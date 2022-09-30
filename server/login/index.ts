import { IRoute, Server } from "../shared/server";
import LoginRoute from "./src/routes/login";
import SignupRoute from "./src/routes/signup";
import dotenv from "dotenv";

dotenv.config({ path: "../.env" });

const server = new Server({
  port: Number(process.env.LOGIN_PORT),
  host: process.env.HOST,
  prefix: "/api",
});

const routes: Array<IRoute> = [
  {
    url: "login",
    router: LoginRoute,
  },
  {
    url: "signup",
    router: SignupRoute,
  },
  // {
  //   url: "logout",
  //   router: LoginRoute,
  // },
];

server.routes(routes);

// const m = new FireBase();
// m.SignUp(user);

server.listen();
