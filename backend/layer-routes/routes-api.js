const router     = require("express").Router();
const auth       = require("../util/auth.js");
const controller = require("../layer-controllers").API_Controller
// ----------------------------------------------------------------------------

router.get("/restore-csrf", controller.RestoreCSRF);
router.get("/set-token", controller.SetTokenCookie);

router.use(auth.restoreUser);

// ----------------------------------------------------------------------------
module.exports = router;