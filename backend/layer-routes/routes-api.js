const router = require("express").Router();
const controller = require("../layer-controllers").API_Controller
const { restoreUser, requireAuth} = require("../util/auth.js");
// ----------------------------------------------------------------------------

router.get("/restore-user", controller.RestoreUser);
router.get("/restore-csrf", controller.RestoreCSRF);
router.get("/set-token", controller.SetTokenCookie);

router.use(restoreUser);

// ----------------------------------------------------------------------------
module.exports = router;