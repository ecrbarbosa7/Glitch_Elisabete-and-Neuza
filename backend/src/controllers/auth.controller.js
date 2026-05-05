const login = (req, res) => {
  const { email, password } = req.body;

  if (email === 'teste@test.com' && password === '123') {
    return res.json({ message: 'Login OK' });
  }

  res.status(401).json({ message: 'Credenciais inválidas' });
};

module.exports = { login };