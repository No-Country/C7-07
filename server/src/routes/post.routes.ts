import { Router } from "express";
import {
  createPost,
  getAllPostsByUserId,
  editPost,
  getAllPosts,
  getPostById,
} from "../controllers/posts";

const router = Router();

router.get("/", getAllPosts);
router.get("/:userId", getAllPostsByUserId);
router.get("/:userId/:postId", getPostById);
router.post("/:userId", createPost);
router.put("/:userId", editPost);

export default router;
