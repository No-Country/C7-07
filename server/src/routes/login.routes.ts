import { Router } from "express";
import { regist } from "../controllers/regist.controllers";
const router = Router();

router.get("/", regist);
export default router;
