async function SignUp(req, res) {
  const { email, password, username } = req.body;
  const hashedPassword = bcrypt.hashSync(password);
  const user = await User.create({ email, username, hashedPassword });
  const safeUser = { id: user.id, email: user.email, username: user.username };

  await setTokenCookie(res, safeUser);

  return res.json({ user: safeUser });
}

function getUsers(req, res) { }

function getUserById(req, res) { }

function updateUser(req, res) { }

function deleteUser(req, res) { }

module.exports = {
  SignUp,
  getUsers,
  getUserById,
  updateUser,
  deleteUser
}