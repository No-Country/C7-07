import { Router } from "express";
import {
  getAllPostsByUserId,
  getPostById,
  createPost,
  editPost,
  deletePostByUserId,
} from "../controllers/post.controllers";
const router = Router();

router.get("/:userId", getAllPostsByUserId);
router.get("/:userId/:postId", getPostById);
router.post("/:userId", createPost);
router.put("/:userId/:postId", editPost);
router.delete("/:userId/:postId", deletePostByUserId);

export default router;
