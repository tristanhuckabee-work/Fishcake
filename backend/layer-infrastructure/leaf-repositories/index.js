// The Repository Leaf-Layer is responsible for coordinating the backend API
// with the Database.

const RepositoryAPI    = require("./repository-api");
const RepositoryAsset  = require("./repository-assets");
const RepositoryTicket = require("./repository-tickets");
const RepositoryUser   = require("./repository-users");
// ----------------------------------------------------------------------------
module.exports = {
  API_Repository: RepositoryAPI,
  Asset_Repository: RepositoryAsset,
  Ticket_Repository: RepositoryTicket,
  User_Repository: RepositoryUser
};