import express, { Application, Router } from "express";
import cors from "cors";
import compression from "compression";
import { config as dotenvConfig } from "dotenv";
import Print from "./utils/Print";

const print = new Print();

export interface IRoutes {
  path: string;
  router: Router;
}

interface IServerProps {
  envDir?: string;
  port?: number;
}

export class Server {
  app: Application;
  port?: number;
  host?: string;
  envDir?: string;

  constructor({ envDir, port }: IServerProps) {
    this.app = express();
    this.envDir = envDir;
    this.port = port;
    this.middlewares();
  }

  private middlewares(): void {
    dotenvConfig({ path: this.envDir });
    this.app.use(cors());
    this.app.use(compression());
    this.app.use(express.json({ limit: "50mb" }));
    this.app.use(express.urlencoded({ extended: true }));
  }

  routes(routes: Array<IRoutes>): void {
    for (const route of routes) {
      this.app.use(route.path, route.router);
    }
  }

  listen(): void {
    this.app.listen(this.port ?? 0, () => {
      print.green(`Connected!`);
    });
  }
}
