import { Router } from "express";
import { verifyToken } from "../middlewares/verifyToken";
import { regist, login } from "../controllers/login";
const router = Router();

router.get("/auth", verifyToken, login);
router.post("/regist", regist);
export default router;
