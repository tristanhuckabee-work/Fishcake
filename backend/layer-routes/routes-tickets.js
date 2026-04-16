const router = require("express").Router();
const controller = require("../layer-controllers").Ticket_Controller
// ----------------------------------------------------------------------------

router.post("/", controller.postTicket)

router.get("/", controller.getTickets)
router.get("/:id", controller.getTicketById)
router.get("/user/:id", controller.getTicketsByUser)

router.update("/", controller.updateTicket)

router.delete("/", controller.deleteTicket)


// ----------------------------------------------------------------------------
module.exports = router;