import { Router } from "express";
import { createPost, getPostById, getPosts } from "../controllers/post";

const router = Router();

router.get("/", getPosts);
router.get("/:id", getPostById);
router.post("/new", createPost);

export default router;
