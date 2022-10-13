import { Router } from "express";
import { verifyToken } from "../middlewares/verifyToken";
import { setPayload } from "../middlewares/setPayload";
import { regist, login } from "../controllers/login";
const router = Router();

router.get("/auth", verifyToken, setPayload, login);
router.post("/regist", regist);
export default router;
