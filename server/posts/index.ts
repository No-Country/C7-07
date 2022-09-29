import { IRoute, Server } from "../shared/server";
import PostRoute from "./src/routes/posts";
import dotenv from "dotenv";
import { DataBase } from "./src/config/DB";
import { Mongoose } from "./src/config/mongoose";

dotenv.config({ path: "../.env" });

const server = new Server({
  port: Number(process.env.POST_PORT),
  host: process.env.HOST,
  prefix: "/api",
});

const db = new DataBase(new Mongoose());
db.init();

const routes: Array<IRoute> = [
  {
    url: "posts",
    router: PostRoute,
  },
];

server.routes(routes);
server.listen();
