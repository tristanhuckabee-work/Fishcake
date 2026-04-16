const router = require("express").Router();
const controller = require("../layer-controllers").User_Controller
// ----------------------------------------------------------------------------

router.post("/", controller.postUser)

router.get("/", controller.getUsers)
router.get("/:id", controller.getUserById)

router.update("/", controller.updateUser)

router.delete("/", controller.deleteUser)

// ----------------------------------------------------------------------------
module.exports = router;