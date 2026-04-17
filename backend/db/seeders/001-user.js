'use strict';

/** @type {import('sequelize-cli').Migration} */
const bcrypt = require("bcryptjs");

let options = {};
options.tableName = 'Users'
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;
}

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert(options, [
      {
        firstName: 'Demo',
        lastName: 'User',
        email: 'demo.user@fishcake.com',
        hashedPassword: bcrypt.hashSync('password'),
        atlassianId: "123456",
        profilePicUrl: "testerly"
      }
    ],);
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete(options);
  }
};