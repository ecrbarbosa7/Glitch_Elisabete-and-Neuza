import bcrypt from "bcryptjs";
import User from "../models/user.model.js";
import { generateToken } from "./token.service.js";

async function registerUser(userData) {

  const {
    name,
    surname,
    address,
    email,
    password
  } = userData;

  // PASSWORD VALIDATION
  if (!password || password.length < 6) {
    throw new Error(
      "Password must contain at least 6 characters"
    );
  }

  // CHECK IF EMAIL ALREADY EXISTS
  const existingUser = await User.findOne({ email });

  if (existingUser) {
    throw new Error("Email already exists");
  }

  // HASH PASSWORD
  const hashedPassword = await bcrypt.hash(password, 10);

  // CREATE USER
  const user = await User.create({
    name,
    surname,
    address,
    email,
    password: hashedPassword
  });

  // GENERATE TOKEN
  const token = generateToken(user._id);

  return {
    user: {
      id: user._id,
      name: user.name,
      surname: user.surname,
      address: user.address,
      email: user.email
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

  const token = generateToken(user._id);

  return {
    user: {
      id: user._id,
      name: user.name,
      surname: user.surname,
      address: user.address,
      email: user.email
    },
    token
  };
}

export {
  registerUser,
  loginUser
};