const bcrypt = require("bcryptjs");
const { check } = require("express-validator");
const router = require("express").Router();
const { Op } = require("sequelize");
const utility = require("./routes-utility.js");
const { User } = require("../db/models");
const { setTokenCookie, restoreUser } = require("../util/auth.js");
const controller = require("../layer-controllers").Session_Controller;
// ----------------------------------------------------------------------------

router.post("/", utility.validateLogin, controller.LogIn);
router.get("/", controller.RestoreSession);
router.delete("/", controller.LogOut);

// ----------------------------------------------------------------------------
module.exports = router;