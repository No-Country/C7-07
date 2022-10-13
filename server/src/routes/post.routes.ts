import { Router } from "express";
import { verifyToken } from "../middlewares/verifyToken";

import {
  createPost,
  getAllPostsByUserId,
  editPost,
  getAllPosts,
  getPostById,
  setLike,
  deletePostByUserId,
} from "../controllers/posts";
import { setPayload } from "../middlewares/setPayload";

const router = Router();

router.get("/", verifyToken, setPayload, getAllPosts);
router.get("/:userId", verifyToken, setPayload, getAllPostsByUserId);
router.get("/:userId/:postId", verifyToken, setPayload, getPostById);
router.post("/", verifyToken, setPayload, createPost);
router.post("/like/:postId", verifyToken, setPayload, setLike);
router.put("/", verifyToken, setPayload, editPost);
router.delete("/:postId", verifyToken, setPayload, deletePostByUserId);

export default router;
