import { envs } from "./config/envs";
import { AppRouter } from "./presentation/routes";
import { Server } from "./presentation/server";

(async () => {
  main();
})();

async function main() {
  const server = new Server({
    port: envs.PORT,
    public_path: envs.PUBLIC_PATH,
    routes: AppRouter.routes,
  });
  await server.start();
}
