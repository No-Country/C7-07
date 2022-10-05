import { Router } from "express";
import {
  createUser,
  editUser,
  getAllUsers,
  getUserById,
  removeUser,
} from "../controllers/user.controllers";
const router = Router();

router.get("/", getAllUsers);
router.get("/:userId", getUserById);
router.post("/", createUser);
router.put("/:userId", editUser);
router.delete("/:userId", removeUser);

export default router;
