// The Adapter Leaf-Layer is responsible for handling calls to external APIs
// and for calling the Normalization Leaf-Layer.

const AdapterAPI    = require("./adapter-api");
const AdapterAsset  = require("./adapter-assets");
const AdapterTicket = require("./adapter-tickets");
const AdapterUser   = require("./adapter-users");
// ----------------------------------------------------------------------------
module.exports = {
  API_Adapter: AdapterAPI,
  Asset_Adapter: AdapterAsset,
  Ticket_Adapter: AdapterTicket,
  User_Adapter: AdapterUser
};