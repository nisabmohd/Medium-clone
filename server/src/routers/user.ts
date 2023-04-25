import express from "express";
import {
  addUserIntrests,
  deleteUser,
  editUser,
  followUser,
  getAllFollowers,
  getAllFollowings,
  getNotifications,
  getUser,
  getUserIntrests,
  removeUserIntrests,
  suggestUsers,
  unfollowUser,
} from "../controllers/user.controller";
import isAuthenticated from "../middlewares/auth";
const router = express.Router();

router
  .route("/myprofile")
  .put(isAuthenticated, editUser)
  .delete(isAuthenticated, deleteUser);

router.route("/suggest").get(isAuthenticated, suggestUsers);

router.route("/notifications").get(isAuthenticated, getNotifications);

router
  .route("/intrests")
  .get(isAuthenticated, getUserIntrests)
  .patch(isAuthenticated, addUserIntrests)
  .delete(isAuthenticated, removeUserIntrests);

router.route("/:userId").get(getUser);

router.route("/followers/:userId").get(getAllFollowers);

router.route("/followings/:userId").get(getAllFollowings);

router.route("/follow/:userId").put(isAuthenticated, followUser);

router.route("/unfollow/:userId").put(isAuthenticated, unfollowUser);

export default router;
