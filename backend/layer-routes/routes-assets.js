const router = require("express").Router();
const controller = require("../layer-controllers").Asset_Controller
// ----------------------------------------------------------------------------

router.post("/", controller.postAsset)

router.get("/", controller.getAssets)
router.get("/:id", controller.getAssetById)
router.get("/user/:id", controller.getAssetByUser)

router.patch("/", controller.updateAsset)

router.delete("/", controller.deleteAsset)

// ----------------------------------------------------------------------------
module.exports = router;