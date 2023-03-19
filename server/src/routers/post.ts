import express from "express";
import {
  comment,
  deletePost,
  editPost,
  explorePost,
  getHomePost,
  getPost,
  getPostOfTopic,
  getUserPost,
  ignorePost,
  morefrom,
  savePost,
  suggestTopics,
  suggestTopPosts,
  vote,
  writePost,
} from "../controllers/post.controller";
import isAuthenticated from "../middlewares/auth";
const router = express.Router();

router.route("/write").post(isAuthenticated, writePost);

router.route("/home").get(isAuthenticated, getHomePost);

router.route("/explore").get(explorePost);

router
  .route("/:postId")
  .get(getPost)
  .put(isAuthenticated, editPost)
  .delete(isAuthenticated, deletePost)
  .patch(isAuthenticated, savePost);

router.route("/vote/:postId").patch(isAuthenticated, vote);

router.route("/comment/:postId").put(isAuthenticated, comment);

router.route("/topic/:topic").get(isAuthenticated, getPostOfTopic);

router.route("/user/:userId").get(isAuthenticated, getUserPost);

router.route("/ignore/:postId").patch(isAuthenticated, ignorePost);

router.route("/suggest/topics").get(suggestTopics);

router.route("/suggest/posts").get(isAuthenticated, suggestTopPosts);

router.route("/more/:postId/:userId").get(morefrom);

export default router;
