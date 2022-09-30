import { Router } from "express";

const router = Router();

router.get("/", (_, res) => {
  return res.json({
    msg: "from login (get)",
  });
});

export default router;
