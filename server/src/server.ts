import { config } from "dotenv";
config();
import { app as server } from "./app";
import mongoose from "mongoose";
import env from "./utils/envalid";

mongoose
  .connect(env.MONGO_URI)
  .then(() => server.listen(env.PORT))
  .then(() => console.log("Server runninng at PORT :", env.PORT))
  .catch((err) => console.log(err));
