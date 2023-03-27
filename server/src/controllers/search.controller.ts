import asyncHandler from "express-async-handler";
import Post from "../models/post";
import Tag from "../models/tag";
import User from "../models/user";
import { getPostsWithUser } from "./post.controller";

//todo pagination
export const postSearch = asyncHandler(async (req, res, nnext) => {
  const { query } = req.params;
  const regex = new RegExp(`${query}`, "i");
  const posts = await getPostsWithUser(Post.find({ title: regex }));
  res.send(posts);
});

//todo pagination
export const topicSearch = asyncHandler(async (req, res, next) => {
  const { query } = req.params;
  const regex = new RegExp(`${query}`, "i");
  const tags = await Tag.find({ name: regex });
  res.send(tags);
});

//todo pagination
export const userSearch = asyncHandler(async (req, res, next) => {
  const { query } = req.params;
  const regex = new RegExp(`${query}`, "i");
  const users = await User.find({ name: regex });
  res.send(users);
});
