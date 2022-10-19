import { Router } from "express";
import {
  getAllTours,
  getTourById,
  getToursByAgencyId,
  createTour,
  editTour,
  deleteTour,
} from "../controllers/tours";
import { verifyToken } from "../middlewares/verifyToken";
import { setPayload } from "../middlewares/setPayload";

const router = Router();

router.get("/", verifyToken, getAllTours);
router.get("/:tourId", verifyToken, getTourById);
router.get("/:agencyId", verifyToken, getToursByAgencyId);
router.post("/", verifyToken, setPayload, createTour);
router.put("/:tourId", verifyToken, setPayload, editTour);
router.delete("/:tourId", verifyToken, setPayload, deleteTour);

export default router;
