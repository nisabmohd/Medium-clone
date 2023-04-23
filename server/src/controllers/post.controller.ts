import asyncHandler from "express-async-handler";
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
  const ignoreAuthor = user?.mutedAuthor ?? [];
  const posts = await getPostsWithUser(
    Post.find({
      $and: [
        { userId: { $ne: userId } },
        { _id: { $nin: ignoreList } },
        { userId: { $nin: ignoreAuthor } },
      ],
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
  let test: string = req.body.markdown ?? "";
  const codeRegex = /<code>(.*?)<\/code>/g;
  const withoutCode = req.body.markdown.replace(codeRegex, "");
  let imgRegex = /<img.*?src=['"](.*?)['"]/;
  let t = imgRegex.exec(test);
  const imgUrl = t ? t[0] : undefined;
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
  if (post.userId.toString() != userId)
    throw new ServerError(403, "Not Allowed");
  const updatedRef = await Post.updateOne(
    { _id: req.params.postId },
    { $set: { ...req.body, tags: req.body.tags.split(",") } }
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

export const suggestTopPosts = asyncHandler(async (req, res, next) => {
  const { userId } = req;
  const user = await User.findOne({ _id: userId });
  const ignoreList = user?.ignore ?? [];
  const ignoreAuthor = user?.mutedAuthor ?? [];
  const posts = await getPostsWithUser(
    Post.find({
      $and: [
        { userId: { $ne: userId } },
        { _id: { $nin: ignoreList } },
        { userId: { $nin: ignoreAuthor } },
      ],
    })
      .sort({ votes: -1 })
      .limit(3)
  );
  res.send(posts);
});

export const suggestTopics = asyncHandler(async (req, res, next) => {
  const { userId } = req.query;
  const user = await User.findOne({ _id: userId });
  const ignoreTopics = [];
  if (user) {
    ignoreTopics.push(...user.intrests);
  }
  const tags = await Tag.find({ name: { $nin: ignoreTopics } }, { name: 1 })
    .sort({ _id: -1 })
    .limit(7);
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
      })
    );
    posts.sort((a, b) => Date.parse(b.createdAt) - Date.parse(a.createdAt));
    res.send(posts);
    return;
  }
  res.send(
    await getPostsWithUser(
      Post.find({ tags: req.params.topic }).sort({ _id: -1 })
    )
  );
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
  const post = await Post.findOneAndUpdate(
    { _id: postId },
    { $push: { votes: userId } },
    { returnDocument: "after" }
  );
  if (post) {
    const user = await User.findOne({ _id: userId });
    await User.updateOne(
      { _id: post.userId },
      {
        $push: {
          notifications: {
            userId,
            username: user?.name,
            avatar: user?.avatar,
            message: "clapped for",
            postId,
            postTitle: post.title,
          },
        },
      }
    );
  }
  res.send({ success: post != undefined });
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

export const morefrom = asyncHandler(async (req, res, next) => {
  const { userId, postId } = req.params;
  res.send(
    await Post.find({ $and: [{ userId }, { _id: { $ne: postId } }] }).limit(3)
  );
});

// todo pagination
export const explorePost = asyncHandler(async (req, res, next) => {
  res.send(await getPostsWithUser(Post.find({}).sort({ _id: -1 })));
});

export const ignoreAuthor = asyncHandler(async (req, res, next) => {
  const { userId } = req;
  const { userId: authorId } = req.params;
  const updated = await User.updateOne(
    { _id: userId },
    { $push: { mutedAuthor: authorId } }
  );
  res.send({ success: updated.modifiedCount == 1 });
});

//todo pagination
export const getAllComments = asyncHandler(async (req, res, next) => {
  const { postId } = req.params;
  if (!postId) throw new ServerError(400, "Post Id is not provided");
  const post = await Post.findOne({ _id: postId });
  if (!post) throw new ServerError(400, "Post does not exist");
  const comments = await Promise.all(
    post.comments.map(async (comment) => {
      return {
        comment: comment.comment,
        user: await User.findOne(
          { _id: comment.userId },
          { notifications: 0, lists: 0 }
        ),
      };
    })
  );
  res.send(comments);
});

export const savePost = asyncHandler(async (req, res, next) => {
  const { userId } = req;
  const { listName } = req.body;
  const { postId } = req.params;
  if (!listName) throw new ServerError(400, "listName not provided");
  const post = await Post.findOne({ _id: postId });
  if (!post) throw new ServerError(400, "Post does not exist");
  const find = await User.findOne({ _id: userId, "lists.name": listName });
  if (!find) {
    const updated = await User.updateOne(
      {
        _id: userId,
      },
      {
        $push: {
          lists: { name: listName, posts: [postId], images: [post.image] },
        },
      }
    );
    res.send({ success: updated.modifiedCount == 1 });
  } else {
    const updated = await User.updateOne(
      { _id: userId, "lists.name": listName },
      { $push: { "lists.$.posts": postId, "lists.$.images": post.image } }
    );
    res.send({ success: updated.modifiedCount == 1 });
  }
});

export const unSavePost = asyncHandler(async (req, res, next) => {
  const { userId } = req;
  const { listName } = req.body;
  const { postId } = req.params;
  if (!listName) throw new ServerError(400, "listName not provided");
  const post = await Post.findOne({ _id: postId });
  if (!post) throw new ServerError(400, "Post does not exist");
  const updated = await User.updateOne(
    { _id: userId, "lists.name": listName },
    { $pull: { "lists.$.posts": postId, "lists.$.images": post.image } }
  );
  res.send({ success: updated.modifiedCount == 1 });
});

// delete list -todo

//todo pagination
export const getAllSavedFromList = asyncHandler(async (req, res, next) => {
  const { listName } = req.params;
  if (!listName) throw new ServerError(400, "listName not provided");
  const user = await User.findOne({ _id: req.userId });
  if (!user) throw new ServerError(400, "User does not exist");
  const savedList = user.lists.find((list) => list.name == listName);
  if (!savedList) throw new ServerError(400, "List does not exist");
  const posts = await Promise.all(
    savedList.posts.map(async (postId) => {
      return await Post.findOne({ _id: postId });
    })
  );
  res.send({
    name: savedList.name,
    posts,
  });
});

export async function getPostsWithUser(q: any) {
  const posts = await q.sort({ _id: -1 });
  return Promise.all(
    posts.map(async (post: any) => {
      const user = await User.findOne({ _id: post.userId });
      return { post, user };
    })
  );
}
