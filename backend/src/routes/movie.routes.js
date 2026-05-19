import express from "express";

import {
  getMovies,
  createMovie,
  updateMovie,
  deleteMovie
} from "../controllers/movie.controller.js";

import authMiddleware from "../middleware/auth.middleware.js";
import adminMiddleware from "../middleware/admin.middleware.js";

const router = express.Router();

router.get("/", getMovies);

router.post(
  "/",
  authMiddleware,
  adminMiddleware,
  createMovie
);

router.put(
  "/:id",
  authMiddleware,
  adminMiddleware,
  updateMovie
);

router.delete(
  "/:id",
  authMiddleware,
  adminMiddleware,
  deleteMovie
);

export default router;