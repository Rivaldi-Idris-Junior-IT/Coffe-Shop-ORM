'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert(
      "orders",
      [
        {
          delivery_methods: "credit_card",
          delivery_address: "Surakarta Jawa Barat",
          delivery_note: "More Cream",
          user_id: 1,
          total_qty: "3",
          total_price: "128000",
          status: "payed",
          created_at: new Date(),
          updated_at: new Date()
        },
      ],
      {}
    );
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('orders', null, {});
  }
};
