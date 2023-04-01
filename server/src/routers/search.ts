import express from "express";
import {
  postSearch,
  topicSearch,
  userSearch,
} from "../controllers/search.controller";

const router = express.Router();

router.route("/posts/:query").post(postSearch);

router.route("/users/:query").post(userSearch);

router.route("/topics/:query").post(topicSearch);

export default router;
