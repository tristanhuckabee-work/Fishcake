const auth = require("../util/auth.js");
const { User } = require("../db/models");
// ----------------------------------------------------------------------------

function RestoreCSRF(req, res) {
  const csrfToken = req.csrfToken();

  res.cookie("XSRF-TOKEN", csrfToken);
  res.status(200).json({
    "XSRF-Token": csrfToken
  });
};

async function SetTokenCookie(_req, res) {
  const user = await User.findOne({ where: { username: 'Demo-lition' } });

  auth.setTokenCookie(res, user);
  return res.json({ user: user });
};

// ----------------------------------------------------------------------------
module.exports = {
  RestoreCSRF,
  SetTokenCookie
};