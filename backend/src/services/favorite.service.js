import User from "../models/user.model.js";

async function getUserFavorites(userId) {
  const user = await User.findById(userId);

  if (!user) {
    throw new Error("User not found");
  }

  return user.favorites;
}

async function addUserFavorite(userId, favoriteData) {
  const user = await User.findById(userId);

  if (!user) {
    throw new Error("User not found");
  }

  const exists = user.favorites.find(
    (item) => item.title === favoriteData.title
  );

  if (exists) {
    return user.favorites;
  }

  user.favorites.push(favoriteData);

  await user.save();

  return user.favorites;
}

async function removeUserFavorite(userId, title) {
  const user = await User.findById(userId);

  if (!user) {
    throw new Error("User not found");
  }

  user.favorites = user.favorites.filter(
    (item) => item.title !== title
  );

  await user.save();

  return user.favorites;
}

export {
  getUserFavorites,
  addUserFavorite,
  removeUserFavorite
};