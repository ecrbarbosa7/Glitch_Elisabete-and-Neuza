import {
  registerUser,
  loginUser
} from "../services/auth.service.js";

async function register(req, res) {
  try {
    const result = await registerUser(req.body);

    return res.status(201).json({
      message: "User registered successfully",
      ...result
    });

  } catch (error) {
    console.error("REGISTER ERROR:", error);

    return res.status(400).json({
      message: error.message
    });
  }
}

async function login(req, res) {
  try {
    const result = await loginUser(req.body);

    return res.status(200).json({
      message: "Login successful",
      ...result
    });

  } catch (error) {
    return res.status(401).json({
      message: error.message
    });
  }
}

export {
  register,
  login
};