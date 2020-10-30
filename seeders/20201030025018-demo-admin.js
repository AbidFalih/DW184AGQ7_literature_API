"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert("Users", [
      {
        fullName: "Admin Abid Keren",
        email: "admin@gmail.com",
        password:
          "$2y$10$S/4YzD97hRYUc9v634S6vuaMrYLPBBraK7smzigNzX3qxvk4CrVHm",
        gender: 0,
        phone: "089671817161",
        address: "Jawa Timur Kota Favorit",
        isAdmin: 1,
        thumb: "i-8.jpg",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("Users", null, {});
  },
};
