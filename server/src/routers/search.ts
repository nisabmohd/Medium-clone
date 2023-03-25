import express from "express";
import {
  postSearch,
  topicSearch,
  userSearch,
} from "../controllers/search.controller";

const router = express.Router();

router.route("/post/:query").get(postSearch);

router.route("/user/:query").get(userSearch);

router.route("/topic/:query").get(topicSearch);

export default router;
