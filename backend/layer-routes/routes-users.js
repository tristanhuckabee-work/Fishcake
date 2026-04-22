const router = require("express").Router();
const bcrypt = require("bcryptjs");
const { setTokenCookie, requireAuth } = require("../util/auth.js");
const { User } = require("../db/models");
const controller = require("../layer-controllers").User_Controller
// ----------------------------------------------------------------------------

router.post("/", controller.SignUp);

// router.get("/", controller.getUsers)
// router.get("/:id", controller.getUserById)

// router.patch("/", controller.updateUser)

// router.delete("/", controller.deleteUser)

// ----------------------------------------------------------------------------
module.exports = router;