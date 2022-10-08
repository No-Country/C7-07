import { Router } from "express";
import {
  getAllTours,
  getTourByAgencyId,
  getToursByAgencyId,
  createTour,
  editTour,
  deleteTour,
} from "../controllers/tours";

const router = Router();

router.get("/", getAllTours);
router.get("/:agencyId/:tourId", getTourByAgencyId);
router.get("/:agencyId", getToursByAgencyId);
router.post("/:agencyId", createTour);
router.post("/:agencyId/:tourId", editTour);
router.delete("/:agencyId/:tourId", deleteTour);

export default router;
