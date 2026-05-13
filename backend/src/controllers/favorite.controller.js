import {
  getUserFavorites,
  addUserFavorite,
  removeUserFavorite
} from "../services/favorite.service.js";

async function getFavorites(req, res) {
  try {
    const favorites = await getUserFavorites(req.user.id);

    return res.status(200).json({
      favorites
    });

  } catch (error) {
    return res.status(400).json({
      message: error.message
    });
  }
}

async function addFavorite(req, res) {
  try {
    const favorites = await addUserFavorite(
      req.user.id,
      req.body
    );

    return res.status(201).json({
      message: "Favorite added successfully",
      favorites
    });

  } catch (error) {
    return res.status(400).json({
      message: error.message
    });
  }
}

async function removeFavorite(req, res) {
  try {
    const favorites = await removeUserFavorite(
      req.user.id,
      req.params.title
    );

    return res.status(200).json({
      message: "Favorite removed successfully",
      favorites
    });

  } catch (error) {
    return res.status(400).json({
      message: error.message
    });
  }
}

export {
  getFavorites,
  addFavorite,
  removeFavorite
};