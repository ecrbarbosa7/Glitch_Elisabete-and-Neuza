import mongoose from "mongoose";

const favoriteSchema = new mongoose.Schema(
  {
    title: String,
    summary: String,
    genre: String,
    year: Number,
    duration: String,
    rating: Number,
    image: String,
    trailer: String,
    type: String
  },
  {
    _id: false
  }
);

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true
    },

    surname: {
      type: String,
      required: true,
      trim: true
    },

    address: {
      type: String,
      required: true,
      trim: true
    },

    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true
    },

    password: {
      type: String,
      required: true
    },
    role: {
    type: String,
    enum: ["user", "admin"],
    default: "user"
    },

    favorites: {
      type: [favoriteSchema],
      default: []
    }
  },
  {
    timestamps: true
  }
);

const User = mongoose.model("User", userSchema, "usersG");

export default User;