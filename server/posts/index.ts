import { IRoute, Server } from "../shared/server";
import PostRoute from "./src/routes/posts";
const server = new Server({
  port: 3012,
  host: "localhost",
  envDir: "./.env",
  prefix: "/api",
});

const routes: Array<IRoute> = [
  {
    url: "posts",
    router: PostRoute,
  },
];

server.routes(routes);

server.listen();
