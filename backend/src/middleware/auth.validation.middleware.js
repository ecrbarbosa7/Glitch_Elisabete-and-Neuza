function validateRegister(req, res, next) {
  const { name, surname, address, email, password } = req.body;

  if (!name || !surname || !address || !email || !password) {
    return res.status(400).json({
      message: "All fields are required"
    });
  }

  if (password.length < 6) {
    return res.status(400).json({
      message: "Password must contain at least 6 characters"
    });
  }

  next();
}

function validateLogin(req, res, next) {
  const { login, password } = req.body;

  if (!login || !password) {
    return res.status(400).json({
      message: "Login and password are required"
    });
  }

  next();
}

export {
  validateRegister,
  validateLogin
};