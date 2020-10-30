"use strict";
const bcrypt = require("bcrypt");

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const hashedPassword = await bcrypt.hash("aaaa1111", 10); //10->saltRound
    return queryInterface.bulkInsert("Users", [
      {
        fullName: "Admin Abid Keren",
        email: "admin@gmail.com",
        password: hashedPassword,
        gender: false,
        phone: "089671817161",
        address: "Jawa Timur Kota Favorit",
        isAdmin: true,
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
