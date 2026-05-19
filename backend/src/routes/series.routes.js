import express from "express";

import {
  getSeries,
  createSerie,
  updateSerie,
  deleteSerie
} from "../controllers/series.controller.js";

import authMiddleware from "../middleware/auth.middleware.js";
import adminMiddleware from "../middleware/admin.middleware.js";

const router = express.Router();

router.get("/", getSeries);

router.post(
  "/",
  authMiddleware,
  adminMiddleware,
  createSerie
);

router.put(
  "/:id",
  authMiddleware,
  adminMiddleware,
  updateSerie
);

router.delete(
  "/:id",
  authMiddleware,
  adminMiddleware,
  deleteSerie
);

export default router;