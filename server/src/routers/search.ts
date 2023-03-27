import express from "express";
import {
  postSearch,
  topicSearch,
  userSearch,
} from "../controllers/search.controller";

const router = express.Router();

router.route("/posts/:query").get(postSearch);

router.route("/users/:query").get(userSearch);

router.route("/topics/:query").get(topicSearch);

export default router;
