"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
     */
    await queryInterface.bulkInsert(
      "users",
      [
        {
          name: "admin",
          email: "admin@gmail.com",
          password: "1234",
          roles: "admin",
          refresh_token: null,
        },
        {
          name: "admin2",
          email: "admin2@gmail.com",
          password: "1234",
          roles: "admin",
          refresh_token: null,
        },
        {
          name: "admin3",
          email: "admin3@gmail.com",
          password: "1234",
          roles: "admin",
          refresh_token: null,
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete("users", null, {});
  },
};
