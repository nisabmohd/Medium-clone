import asyncHandler from "express-async-handler";
import Post from "../models/post";
import ServerError from "../utils/ServerError";

export const getUserPost = asyncHandler(async (req, res, next) => {
  res.send(await Post.find({ userId: req.params.userId }));
});

export const getHomePost = asyncHandler(async (req, res, next) => {
  const { userId } = req;
  const posts = await Post.find({ userId: { $ne: userId } });
  res.send(posts);
});

export const getPost = asyncHandler(async (req, res, next) => {
  const post = await Post.findOne({ postId: req.params.postId });
  if (!post) throw new ServerError(400, "No such post found!");
  res.send(post);
});

export const writePost = asyncHandler((req, res, next) => {});

export const editPost = asyncHandler((req, res, next) => {});

export const deletePost = asyncHandler((req, res, next) => {});

export const savePost = asyncHandler((req, res, next) => {});

export const suggestPosts = asyncHandler((req, res, next) => {});

export const suggestTopics = asyncHandler((req, res, next) => {});

export const getPostOfTopic = asyncHandler((req, res, next) => {});
