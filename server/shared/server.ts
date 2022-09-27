import express, { Express, Router } from "express";
import dotenv from "dotenv";
import cors from "cors";
import Util from "./utils";
import { AddressInfo } from "net";
const Console = new Util();

export interface IRoute {
  url: string;
  router: Router;
}

export class Server {
  app: Express;
  port: number;
  host: string;
  envDir: string;
  prefix?: string;

  constructor({ port, host, envDir, prefix = "/" }) {
    if (typeof port !== "number" || typeof host !== "string") {
      Console.red(
        `
				---------------------------------------------------------------------------------------------------------------------------
				Erorr: host and port must be defined, expected <number> <string> but you got ${port} ${host}
				---------------------------------------------------------------------------------------------------------------------------
				`
      );
      process.exit(1);
    }

    this.app = express();
    this.port = port;
    this.host = host;
    this.envDir = envDir;
    this.prefix = prefix;

    this.middlewares();
  }

  private middlewares() {
    dotenv.config({ path: this.envDir });
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: true }));
    this.app.use(cors());
  }

  use(cb) {
    return this.app.use(cb);
  }

  routes(routes: Array<IRoute>) {
    routes.forEach((route) => {
      this.app.use(`${this.prefix}/${route.url}`, route.router);
    });
  }

  listen() {
    const listener = this.app.listen(this.port, this.host, () => {
      Console.red(
        `
				---------------------------------------------------------------------
				Server up successfully on: http://${this.host}:${
          (listener.address() as AddressInfo)?.port
        }/
				---------------------------------------------------------------------
				`
      );
    });
  }
}
