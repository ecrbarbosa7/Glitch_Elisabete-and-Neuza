import express from "express";

import authMiddleware from "../middleware/auth.middleware.js";

import {
  getFavorites,
  addFavorite,
  removeFavorite
} from "../controllers/favorite.controller.js";

const router = express.Router();

router.get("/", authMiddleware, getFavorites);

router.post("/", authMiddleware, addFavorite);

router.delete("/:title", authMiddleware, removeFavorite);

export default router;