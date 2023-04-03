import asyncHandler from "express-async-handler";
import User from "../models/user";
import ServerError from "../utils/ServerError";

export const editUser = asyncHandler(async (req, res, next) => {
  const { userId } = req;
  const user = await User.findOne({ _id: userId });
  if (!user) throw new ServerError(400, "User doesn't exist");
  const updatedRef = await User.updateOne({ _id: userId }, req.body);
  res.send({ success: updatedRef.modifiedCount == 1 });
});

export const deleteUser = asyncHandler(async (req, res, next) => {
  const { userId } = req;
  const user = await User.findOne({ _id: userId });
  if (!user) throw new ServerError(400, "User doesn't exist");
  const deletedRef = await User.deleteOne({ _id: userId });
  res.send({ success: deletedRef.deletedCount == 1 });
});

export const followUser = asyncHandler(async (req, res, next) => {
  const { userId: userTo } = req.params;
  const { userId } = req;
  const checkOther = await User.findOne({ _id: userTo });
  if (!checkOther) throw new ServerError(404, "User does not exist");
  const checkMe = await User.findOne({ _id: userId });
  const index = checkMe?.followings.findIndex(
    (item) => item.toString() === userTo
  );

  if (index != -1) {
    res.send({ success: false });
    return;
  }
  const me = await User.findOneAndUpdate(
    { _id: userId },
    { $push: { followings: userTo } },
    { returnDocument: "after" }
  );
  const other = await User.findOneAndUpdate(
    { _id: userTo },
    { $push: { followers: userId } },
    { returnDocument: "after" }
  );
  await User.updateOne(
    { _id: other?._id },
    {
      $push: {
        notifications: {
          userId,
          username: me?.name,
          avatar: me?.avatar,
          message: "started following you",
        },
      },
    }
  );
  res.send({ success: other && me });
});

export const unfollowUser = asyncHandler(async (req, res, next) => {
  const { userId: userTo } = req.params;
  const { userId } = req;
  const checkOther = await User.findOne({ _id: userTo });
  if (!checkOther) throw new ServerError(404, "User does not exist");
  const checkMe = await User.findOne({ _id: userId });
  const index = checkMe?.followings.findIndex(
    (item) => item.toString() === userTo
  );

  if (index == -1) {
    res.send({ success: false });
    return;
  }
  const me = await User.updateOne(
    { _id: userId },
    { $pull: { followings: userTo } }
  );
  const other = await User.updateOne(
    { _id: userTo },
    { $pull: { followers: userId } }
  );
  res.send({ success: other.modifiedCount == 1 && me.modifiedCount == 1 });
});

export const suggestUsers = asyncHandler(async (req, res, next) => {
  const { userId } = req;
  const users = await User.find({
    $and: [{ _id: { $ne: userId } }, { followers: { $ne: userId } }],
  }).limit(3);
  res.send(users);
});

export const getUser = asyncHandler(async (req, res, next) => {
  const { userId } = req.params;
  const user = await User.findOne({ _id: userId });
  if (!user) throw new ServerError(400, "User doesn't exist");
  res.json(user);
});

export const getUserIntrests = asyncHandler(async (req, res, next) => {
  const intrests = await User.findOne({ _id: req.userId }, { intrests: 1 });
  res.send(intrests);
});

// totdo pagination
export const getNotifications = asyncHandler(async (req, res, next) => {
  const notifications = await User.findOne(
    { _id: req.userId },
    { notifications: 1, _id: 0 }
  );
  res.send(notifications?.notifications.reverse());
});

export const getAllFollowers = asyncHandler(async (req, res, next) => {
  const { userId } = req.params;
  if (!userId) throw new ServerError(400, "No user id provided");
  const user = await User.findOne({ _id: userId });
  if (!user) throw new ServerError(400, "User does not exist");
  const followers = await Promise.all(
    user!.followers.map(async (item) => {
      return await User.findOne({ _id: item }, { notifications: 0 });
    })
  );
  res.send(followers);
});

export const getAllFollowings = asyncHandler(async (req, res, next) => {
  const { userId } = req.params;
  if (!userId) throw new ServerError(400, "No user id provided");
  const user = await User.findOne({ _id: userId });
  if (!user) throw new ServerError(400, "User does not exist");
  const followings = await Promise.all(
    user!.followings.map(async (item) => {
      return await User.findOne({ _id: item }, { notifications: 0 });
    })
  );
  res.send(followings);
});
