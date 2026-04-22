// The Controller Layer is responsible for handling HTTP requests and responses

module.exports = {
  API_Controller: require("./controller-api"),
  Asset_Controller: require("./controller-assets"),
  Session_Controller: require("./controller-session"),
  Ticket_Controller: require("./controller-tickets"),
  User_Controller: require("./controller-users")
};