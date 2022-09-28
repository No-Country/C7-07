import { Router } from "express";
import firebaseSignup from "../controllers/firebaseSignup";

const router = Router();

router.post("/firebase", firebaseSignup);

export default router;
