import bcrypt from "bcryptjs";
import User from "../models/user.model.js";
import { generateToken } from "./token.service.js";

function getUserRole(email) {
  const adminEmails = process.env.ADMIN_EMAILS
    ? process.env.ADMIN_EMAILS.split(",").map((adminEmail) => adminEmail.trim())
    : [];

  return adminEmails.includes(email) ? "admin" : "user";
}

async function registerUser(userData) {
  const {
    name,
    surname,
    address,
    email,
    password
  } = userData;

  if (!password || password.length < 6) {
    throw new Error("Password must contain at least 6 characters");
  }

  const existingUser = await User.findOne({ email });

  if (existingUser) {
    throw new Error("Email already exists");
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const role = getUserRole(email);

  const user = await User.create({
    name,
    surname,
    address,
    email,
    password: hashedPassword,
    role,
    favorites: []
  });

  const token = generateToken(user._id);

  return {
    user: {
      id: user._id,
      name: user.name,
      surname: user.surname,
      address: user.address,
      email: user.email,
      role: user.role
    },
    token
  };
}

async function loginUser(loginData) {
  const { login, password } = loginData;

  const user = await User.findOne({
    $or: [
      { email: login },
      { name: login }
    ]
  });

  if (!user) {
    throw new Error("Invalid credentials");
  }

  const isPasswordValid = await bcrypt.compare(
    password,
    user.password
  );

  if (!isPasswordValid) {
    throw new Error("Invalid credentials");
  }

  const role = getUserRole(user.email);

  if (user.role !== role) {
    user.role = role;
    await user.save();
  }

  const token = generateToken(user._id);

  return {
    user: {
      id: user._id,
      name: user.name,
      surname: user.surname,
      address: user.address,
      email: user.email,
      role: user.role
    },
    token
  };
}

export {
  registerUser,
  loginUser
};