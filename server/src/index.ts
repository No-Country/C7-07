import { Mongo } from "./config/Mongo";
import { IRoutes, Server } from "./server";
import PostRouter from "./routes/posts.routes";
import UserRouter from "./routes/user.routes";
import LoginRouter from "./routes/login.routes";

async function main(
  envDir: string | undefined,
  port: number,
  host = "localhost",
  routes: Array<IRoutes>
) {
  const server = new Server({
    envDir,
    host,
    port,
  });
  const mongo = new Mongo();
  await mongo.exec();
  server.routes(routes);
  server.listen();
}

const ROUTES: Array<IRoutes> = [
  {
    path: "/posts",
    router: PostRouter,
  },
  {
    path: "/users",
    router: UserRouter,
  },
  {
    path: "/login",
    router: LoginRouter,
  },
];

main(undefined, 3001, "localhost", ROUTES);
