import express from "express";
import {
  deleteUser,
  editUser,
  followUser,
  getNotifications,
  getUser,
  getUserIntrests,
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

router.route("/intrests").get(isAuthenticated, getUserIntrests);

router.route("/:userId").get(getUser);

router.route("/follow/:userId").put(isAuthenticated, followUser);

router.route("/unfollow/:userId").put(isAuthenticated, unfollowUser);

export default router;
