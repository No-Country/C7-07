import { IRoute, Server } from "../shared/server";
import LoginRoute from "./src/routes/login";
const server = new Server({
  port: 3011,
  host: "localhost",
  envDir: "./.env",
  prefix: "/api",
});

const routes: Array<IRoute> = [
  {
    url: "login",
    router: LoginRoute,
  },
  {
    url: "logout",
    router: LoginRoute,
  },
];

server.routes(routes);

server.listen();
