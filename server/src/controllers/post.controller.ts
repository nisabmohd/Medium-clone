import asyncHandler from "express-async-handler";
import post from "../models/post";
import Post from "../models/post";
import Tag from "../models/tag";
import User from "../models/user";
import ServerError from "../utils/ServerError";

export const getUserPost = asyncHandler(async (req, res, next) => {
  res.send(await Post.find({ userId: req.params.userId }).sort({ _id: -1 }));
});

// todo pagination
export const getHomePost = asyncHandler(async (req, res, next) => {
  const { userId } = req;
  const user = await User.findOne({ _id: userId });
  const ignoreList = user?.ignore ?? [];
  const posts = await getPostsWithUser(
    Post.find({
      $and: [{ userId: { $ne: userId } }, { _id: { $nin: ignoreList } }],
    })
  );
  res.send(posts);
});

export const getPost = asyncHandler(async (req, res, next) => {
  const post = await Post.findOne({ _id: req.params.postId });
  if (!post) throw new ServerError(400, "No such post found!");
  const user = await User.findOne({ _id: post.userId });
  res.send({ post, user });
});

export const writePost = asyncHandler(async (req, res, next) => {
  const { userId } = req;
  var test: string = req.body.markdown ?? "";
  const codeRegex = /<code>(.*?)<\/code>/g;
  const withoutCode = req.body.markdown.replace(codeRegex, "");
  var imgRegex = /<img.*?src=['"](.*?)['"]/;
  const imgUrl = imgRegex.exec(test)?.at(1);
  const htmlRegexG = /<(?:"[^"]*"['"]*|'[^']*'['"]*|[^'">])+>/g;
  const summary = withoutCode.replace(htmlRegexG, "");
  const postRef = new Post({
    ...req.body,
    tags: req.body.tags.split(","),
    userId,
    image: imgUrl,
    summary,
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
  const tags = await Tag.find({}, { name: 1 }).sort({ _id: -1 }).limit(7);
  res.send(tags);
});

// pagination todo
export const getPostOfTopic = asyncHandler(async (req, res, next) => {
  if (req.params.topic === "Following") {
    const user = await User.findOne({ _id: req.userId });
    const posts: Array<any> = [];
    await Promise.all(
      (user?.followings ?? []).map(async (userId) => {
        posts.push(...(await getPostsWithUser(Post.find({ userId }))));
        return null;
      })
    );
    posts.sort((a, b) => Date.parse(b.createdAt) - Date.parse(a.createdAt));
    res.send(posts);
    return;
  }
  res.send(await getPostsWithUser(Post.find({ tags: req.params.topic })));
});

export const ignorePost = asyncHandler(async function (req, res, next) {
  const { userId } = req;
  const { postId } = req.params;
  const updated = await User.updateOne(
    { _id: userId },
    { $push: { ignore: postId } }
  );
  res.send({ success: updated.modifiedCount == 1 });
});

export const vote = asyncHandler(async (req, res, next) => {
  const { postId } = req.params;
  const { userId } = req;
  const post = await Post.updateOne(
    { _id: postId },
    { $push: { votes: userId } }
  );
  res.send({ success: post.modifiedCount == 1 });
});

export const comment = asyncHandler(async (req, res, next) => {
  const { postId } = req.params;
  const { userId } = req;
  const { comment } = req.body;
  const post = await Post.updateOne(
    { _id: postId },
    { $push: { comments: { userId, comment } } }
  );
  res.send({ success: post.modifiedCount == 1 });
});

async function getPostsWithUser(q: any) {
  const posts = await q.sort({ _id: -1 });
  return Promise.all(
    posts.map(async (post: any) => {
      const user = await User.findOne({ _id: post.userId });
      return { post, user };
    })
  );
}
