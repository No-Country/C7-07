import { Router } from "express";

const router = Router();

router.get("/", (_, res) => {
  return res.json({
    msg: "from posts (get)",
    posts: [],
  });
});

export default router;
