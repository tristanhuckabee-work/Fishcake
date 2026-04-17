const router = require("express").Router();
const controller = require("../layer-controllers").API_Controller
// ----------------------------------------------------------------------------

router.get("/csrf/restore", controller.RestoreCSRF);

// ----------------------------------------------------------------------------
module.exports = router;