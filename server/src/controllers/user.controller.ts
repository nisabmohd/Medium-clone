import asyncHandler from "express-async-handler";
import User from "../models/user";
import ServerError from "../utils/ServerError";

export const editUser = asyncHandler((req, res, next) => {});

export const deleteUser = asyncHandler((req, res, next) => {});

export const followUnfollowUser = asyncHandler((req, res, next) => {});

export const suggestUsers = asyncHandler((req, res, next) => {});

export const getUser = asyncHandler(async (req, res, next) => {
  const { userId } = req.params;
  const user = await User.findOne({ _id: userId });
  if (!user) throw new ServerError(400, "User doesn't exist");
  res.json(user);
});
