// The Controller Layer is responsible for handling HTTP requests and responses

const ControllerAPI    = require("./controller-api");
const ControllerAsset  = require("./controller-assets");
const ControllerTicket = require("./controller-tickets");
const ControllerUser   = require("./controller-users");
// ----------------------------------------------------------------------------
module.exports = {
  API_Controller: ControllerAPI,
  Asset_Controller: ControllerAsset,
  Ticket_Controller: ControllerTicket,
  User_Controller: ControllerUser
};