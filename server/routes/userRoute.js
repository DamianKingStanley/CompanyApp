import express from "express";
import auth from "../middleware/auth.js";
import upload from "../multer.js";

import {
  userRegister,
  login,
  getUserProfile,
  updateUserProfile,
  likePostByUser,
  // getUserPosts,
  getUserById,
  getAllUsers,
  forgotPassword,
  resetPassword,
} from "../controllers/userController.js";

const router = express.Router();

router.post("/user/register", userRegister);
router.post("/user/login", login);
router.post("/user/like-post", likePostByUser);
router.get("/user/:userId", getUserById);
router.get("/users", getAllUsers);
router.post("/forgot-password", forgotPassword);
router.post("/reset", resetPassword);
router.get("/user/profile/:userId", getUserProfile);

router.put(
  "/user/profile/:userId/update",
  auth,
  upload.single("profilePicture"),

  updateUserProfile
);

// admin section

export default router;
