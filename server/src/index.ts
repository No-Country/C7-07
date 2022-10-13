import { Mongo } from "./config/Mongo";
import { IRoutes, Server } from "./server";

import UserRouter from "./routes/user.routes";
import PostRouter from "./routes/post.routes";
import LoginRouter from "./routes/login.routes";
import TourRouter from "./routes/tour.routes";

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
    path: "/users",
    router: UserRouter,
  },
  {
    path: "/posts",
    router: PostRouter,
  },
  {
    path: "/login",
    router: LoginRouter,
  },
  {
    path: "/tours",
    router: TourRouter,
  },
];

main(undefined, 3001, "localhost", ROUTES);
