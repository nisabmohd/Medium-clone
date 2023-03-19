import express from "express";
import {
  deletePost,
  editPost,
  getHomePost,
  getPost,
  getPostOfTopic,
  getUserPost,
  ignorePost,
  savePost,
  suggestTopics,
  suggestTopPosts,
  writePost,
} from "../controllers/post.controller";
import isAuthenticated from "../middlewares/auth";
const router = express.Router();

router.route("/write").post(isAuthenticated, writePost);

router.route("/home").get(isAuthenticated, getHomePost);

router
  .route("/:postId")
  .get(getPost)
  .put(isAuthenticated, editPost)
  .delete(isAuthenticated, deletePost)
  .patch(isAuthenticated, savePost);

router.route("/topic/:topic").get(isAuthenticated, getPostOfTopic);

router.route("/user/:userId").get(isAuthenticated, getUserPost);

router.route("/ignore/:postId").patch(isAuthenticated, ignorePost);

router.route("/suggest/topics").get(suggestTopics);

router.route("/suggest/posts").get(isAuthenticated, suggestTopPosts);

export default router;
