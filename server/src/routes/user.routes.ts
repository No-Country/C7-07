import { Router } from "express";
import { verifyToken } from "../middlewares/verifyToken";
import {
  editUser,
  getAllUsers,
  getUserById,
  getUserInfo,
  removeUser,
} from "../controllers/users";
import { setPayload } from "../middlewares/setPayload";
const router = Router();

router.get("/", verifyToken, setPayload, getAllUsers);
router.get("/me", verifyToken, setPayload, getUserInfo);
router.get("/:userId", verifyToken, getUserById);
router.put("/", verifyToken, setPayload, editUser);
router.delete("/", verifyToken, setPayload, removeUser);

export default router;
