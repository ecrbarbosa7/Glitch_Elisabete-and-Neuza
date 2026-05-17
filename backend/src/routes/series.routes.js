import express from "express";

import {
  getSeries,
  createSerie,
  updateSerie,
  deleteSerie
} from "../controllers/series.controller.js";

const router = express.Router();

router.get("/", getSeries);
router.post("/", createSerie);
router.put("/:id", updateSerie);
router.delete("/:id", deleteSerie);

export default router;