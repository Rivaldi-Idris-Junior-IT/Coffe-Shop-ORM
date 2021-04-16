"use strict";
const bcrypt = require('bcrypt');
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert(
      "users",
      [
        {
          fullname: "Fikari",
          email: "fikari@gmail.com",
          gender: "laki-laki",
          phone: "08960276823",
          avatar: "yes",
          date_of_birth: "2021-09-21",
          address: "Jl Rawasari",          
          password: await bcrypt.hash("12345678", Number(process.env.SALT_ROUND || 10)),
          role: "admin",
          created_at: new Date(),
          updated_at: new Date()   
        },
      ]);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("users", null, {});
  },
};
