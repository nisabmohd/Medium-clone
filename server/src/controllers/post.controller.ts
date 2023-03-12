import asyncHandler from "express-async-handler";
import Post from "../models/post";
import Tag from "../models/tag";
import ServerError from "../utils/ServerError";

export const getUserPost = asyncHandler(async (req, res, next) => {
  res.send(await Post.find({ userId: req.params.userId }));
});

// todo
// pagination
export const getHomePost = asyncHandler(async (req, res, next) => {
  const { userId } = req;
  const posts = await Post.find({ userId: { $ne: userId } });
  res.send(posts);
});

export const getPost = asyncHandler(async (req, res, next) => {
  const post = await Post.findOne({ _id: req.params.postId });
  if (!post) throw new ServerError(400, "No such post found!");
  res.send(post);
});

export const writePost = asyncHandler(async (req, res, next) => {
  const { userId } = req;
  const postRef = new Post({
    ...req.body,
    tags: req.body.tags.split(","),
    userId,
  });
  const post = await postRef.save();
  Promise.all(
    post.tags.map(async (item) => {
      const isTag = await Tag.findOne({ name: item });
      if (!isTag) await new Tag({ name: item }).save();
    })
  );
  res.send(post);
});

export const editPost = asyncHandler(async (req, res, next) => {
  const { userId } = req;
  const post = await Post.findOne({ _id: req.params.postId });
  if (!post) throw new ServerError(400, "No such post found");
  console.log(post.userId.toString(), userId);
  if (post.userId.toString() != userId)
    throw new ServerError(403, "Not Allowed");
  const updatedRef = await Post.updateOne(
    { _id: req.params.postId },
    { $set: req.body }
  );
  res.send({ success: updatedRef.modifiedCount == 1 });
});

export const deletePost = asyncHandler(async (req, res, next) => {
  const { userId } = req;
  const post = await Post.findOne({ _id: req.params.postId });
  if (!post) throw new ServerError(400, "No such post found");
  if (post.userId.toString() != userId)
    throw new ServerError(403, "Not Allowed");
  const deletedRef = await Post.deleteOne({ _id: req.params.postId });
  res.send({ success: deletedRef.deletedCount == 1 });
});

//todo
export const savePost = asyncHandler(async (req, res, next) => {
  const { userId } = req;
  const { listName } = req.body;
});

export const suggestTopPosts = asyncHandler(async (req, res, next) => {
  const posts = await Post.find({}).sort({ votes: -1 }).limit(3);
  res.send(posts);
});

export const suggestTopics = asyncHandler(async (req, res, next) => {
  const tags = await Tag.find({}, { name: 1 }).limit(7);
  res.send(tags);
});

export const getPostOfTopic = asyncHandler(async (req, res, next) => {
  res.send(await Post.find({ tags: req.params.topic }));
});
