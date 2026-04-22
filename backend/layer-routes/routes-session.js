const bcrypt = require("bcryptjs");
const router = require("express").Router();
const { Op } = require("sequelize");
const { User } = require("../db/models");
const { setTokenCookie, restoreUser } = require("../util/auth.js");
const controller = require("../layer-controllers").Session_Controller;
// ----------------------------------------------------------------------------

router.post("/", controller.LogIn);
router.delete("/", controller.LogOut);

// ----------------------------------------------------------------------------
module.exports = router;