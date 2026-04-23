const router     = require("express").Router();
const utility    = require("./routes-utility.js");
const auth       = require("../util/auth.js");
const controller = require("../layer-controllers").Session_Controller;
// ----------------------------------------------------------------------------

router.post("/", utility.validateLogin, controller.LogIn);
router.get("/", auth.restoreUser, controller.RestoreSession);
router.delete("/", controller.LogOut);

// ----------------------------------------------------------------------------
module.exports = router;