import { Router } from "express";
import firebaseLogin from "../controllers/firebaseLogin";

const router = Router();
router.get("/firebase/:id", firebaseLogin);

export default router;
