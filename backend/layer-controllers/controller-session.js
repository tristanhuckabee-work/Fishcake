const bcrypt = require('bcryptjs');
const express = require('express');
const { Op } = require('sequelize');
const { User } = require('../db/models');
const { setTokenCookie, restoreUser } = require('../util/auth.js');
// ----------------------------------------------------------------------------

async function LogIn(req, res, next) {
  const { credential, password } = req.body;

  const user = await User.unscoped().findOne({
    where: { [Op.or]: { email: credential } }
  });

  if (!user || !bcrypt.compareSync(password, user.hashedPassword.toString())) {
    const err = new Error('Login failed');
    err.status = 401;
    err.title = 'Login failed';
    err.errors = { credential: 'The provided credentials were invalid.' };
    return next(err);
  };

  const safeUser = { id: user.id, email: user.email, username: user.username };

  await setTokenCookie(res, safeUser);

  return res.json({ user: safeUser });
};

function LogOut(_req, res) {
  res.clearCookie("token");
  return res.json({ message: "success" });
};

function RestoreSession(req, res) {
  const { user } = req;
  if (user) {
    const safeUser = { id: user.id, email: user.email, username: user.username };
    return res.json({ user: safeUser });
  } else {
    return res.json({ user: null });
  }
}

// ----------------------------------------------------------------------------
module.exports = {
  LogIn,
  LogOut,
  RestoreSession
};