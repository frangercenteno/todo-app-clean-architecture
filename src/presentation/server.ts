import express, { Router } from "express";
import compression from "compression";
import path from "path";

interface Options {
  port: number;
  public_path?: string;
  routes: Router;
}

export class Server {
  public readonly app = express();
  private serverListener?: any;
  private readonly port: number;
  private readonly publicPath: string;
  private readonly routes: Router;

  constructor(options: Options) {
    const { port, public_path = "public", routes } = options;
    this.port = port;
    this.publicPath = public_path;
    this.routes = routes;
  }

  // Middleware
  private middleware() {
    // Static files
    this.app.use(express.static(this.publicPath));

    // Compression
    this.app.use(compression());

    // JSON
    this.app.use(express.json()); //raw json

    // URL Encoded x-www-form-urlencoded
    this.app.use(express.urlencoded({ extended: true }));
  }

  async start() {
    this.middleware();

    // API
    this.app.use(this.routes);

    // SPA
    this.app.get("*", (req, res) => {
      const indexPath = path.join(
        __dirname + `../../../${this.publicPath}/index.html`
      );
      res.sendFile(indexPath);
    });
    this.serverListener = this.app.listen(this.port, () => {
      console.log(`Server is listening on port ${this.port}`);
    });
  }

  public close() {
    this.serverListener?.close();
  }
}
