import express, { Application, Router } from "express";
import cors from "cors";
import { config as dotenvConfig, DotenvConfigOutput } from "dotenv";
import Print from "./utils/Print";

const print = new Print();

export interface IRoutes {
  path: string;
  router: Router;
}

interface IServerProps {
  envDir?: string;
  port?: number;
  host?: string;
}

export class Server {
  app: Application;
  port?: number;
  host?: string;
  envDir?: string;

  constructor({ envDir, host, port }: IServerProps) {
    this.app = express();
    this.envDir = envDir;
    this.port = port;
    this.host = host;
    this.middlewares();
  }

  private middlewares(): void {
    dotenvConfig({ path: this.envDir });
    this.app.use(cors());
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: true }));
  }

  routes(routes: Array<IRoutes>): void {
    for (const route of routes) {
      this.app.use(route.path, route.router);
    }
  }

  listen(): void {
    this.app.listen(this.port ?? 0, this.host ?? "localhost", () => {
      print.green(`Connected on http://${this.host}:${this.port}/`);
    });
  }
}
