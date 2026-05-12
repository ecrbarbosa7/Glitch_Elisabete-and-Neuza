import mongoose from "mongoose";

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

    favorites: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Content"
      }
    ]
  },
  {
    timestamps: true
  }
);

const User = mongoose.model("User", userSchema, "usersG");

export default User;