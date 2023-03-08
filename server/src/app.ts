import expreess from "express";
export const app = expreess();
import env from "./utils/envalid";
import logger from "./middlewares/logger";

const isProd = !env.DEV;
if (isProd) {
  app.use(logger);
}

app.get("/test", (req, res) => {
  res.send("Hello from server side");
});
