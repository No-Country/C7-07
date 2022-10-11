import { Router } from "express";
import {
  createPost,
  getAllPostsByUserId,
  editPost,
  getAllPosts,
  getPostById,
  setLike,
  deletePostByUserId,
} from "../controllers/posts";

const router = Router();

router.get("/", getAllPosts);
router.get("/:userId", getAllPostsByUserId);
router.get("/:userId/:postId", getPostById);
router.post("/:userId", createPost);
router.post("/like/:userId/:postId", setLike);
router.put("/:userId", editPost);
router.delete("/:userId/:postId", deletePostByUserId);

export default router;
