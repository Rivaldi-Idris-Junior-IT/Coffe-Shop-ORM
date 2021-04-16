'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert(
      "products",
      [
        {
          product_name: "Wine Zeke Spinal Fluid",          
          regular_price: 78000,
          sale_price: 58000,
          description: "Zeke Spinal Fluid with Wine Grape Taste...Feel Ordinary",
          images: "yes dulu lah aing",
          created_at: new Date(),
          updated_at: new Date()
        },
      ],
      {}
    );
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('products', null, {});
  }
};