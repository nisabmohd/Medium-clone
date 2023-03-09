import expreess from "express";
export const app = expreess();
import env from "./utils/envalid";
import logger from "./middlewares/logger";
import postRouter from "./routers/post";
import authRouter from "./routers/auth";
import userRouter from "./routers/user";

const isProd = !env.DEV;
if (isProd) {
  app.use(logger);
}
app.use(expreess.json());

declare global {
  namespace Express {
    interface Request {
      userId: string;
    }
  }
}

app.get("/test", (req, res) => {
  res.send("Hello from server side");
});

app.use("/post", postRouter);
app.use("/auth", authRouter);
app.use("/user", userRouter);
