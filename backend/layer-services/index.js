// The Service Layer is responsible for all Business logic and coordinating
// with the Infrastructure Layer.

const ServiceAPI    = require("./service-api");
const ServiceAsset  = require("./service-assets");
const ServiceTicket = require("./service-tickets");
const ServiceUser   = require("./service-users");
// ----------------------------------------------------------------------------
module.exports = {
  API_Service: ServiceAPI,
  Asset_Service: ServiceAsset,
  Ticket_Service: ServiceTicket,
  User_Service: ServiceUser
};