const bcrypt = require("bcryptjs");
const { User } = require("../db/models");
const { setTokenCookie } = require("../util/auth");
// ----------------------------------------------------------------------------

async function SignUp(req, res) {
  const { email, firstName, lastName, confirm, password, profilePicUrl } = req.body;
  const errors = {};

  const hashedPassword = bcrypt.hashSync(password);
  const user = await User.create({ email, firstName, lastName, hashedPassword, profilePicUrl });
  const safeUser = {
    id: user.id,
    email: user.email,
    firstName: user.firstName,
    lastName: user.lastName,
    profilePicUrl: user.profilePicUrl
  };

  await setTokenCookie(res, safeUser);

  return res.json({ user: safeUser });
}

function getUsers(req, res) { }

function getUserById(req, res) { }

function updateUser(req, res) { }

function deleteUser(req, res) { }

// ----------------------------------------------------------------------------
module.exports = {
  SignUp,
  getUsers,
  getUserById,
  updateUser,
  deleteUser
}