// The Normalizer Leaf-Layer is responsible for turning raw responses into
// Fishcake Objects.

const NormalizerAPI    = require("./normalizer-api");
const NormalizerAsset  = require("./normalizer-assets");
const NormalizerTicket = require("./normalizer-tickets");
const NormalizerUser   = require("./normalizer-users");
// ----------------------------------------------------------------------------
module.exports = {
  API_Normalizer: NormalizerAPI,
  Asset_Normalizer: NormalizerAsset,
  Ticket_Normalizer: NormalizerTicket,
  User_Normalizer: NormalizerUser
};