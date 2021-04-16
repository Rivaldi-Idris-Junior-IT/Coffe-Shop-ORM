'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert(
      "orderdetail",
      [
        {
          product_id: 4,
          order_id: 1,
          total_qty: 2,
          total_price: 45000,
          created_at: new Date(),
          updated_at: new Date()
        },
      ],
      {}
    );
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('orderdetail', null, {});
  }
};
