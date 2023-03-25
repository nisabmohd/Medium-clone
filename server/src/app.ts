import express from "express";
export const app = express();
import env from "./utils/envalid";
import logger from "./middlewares/logger";
import postRouter from "./routers/post";
import authRouter from "./routers/auth";
import userRouter from "./routers/user";
import searchRouter from "./routers/search";
import cors from "cors";
import { errorHandler } from "./middlewares/errorHandler";

const isProd = !env.DEV;
if (isProd) {
  app.use(logger);
}
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

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
app.use("/search", searchRouter);

app.use(errorHandler);
