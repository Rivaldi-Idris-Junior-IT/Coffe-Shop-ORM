'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("orders", {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
      },
      delivery_methods: {
        type: Sequelize.ENUM,
        values: ["credit_card", "cash", "topup"],
        allowNull: false,
      },
      delivery_address: {
        type: Sequelize.TEXT,
        allowNull: false,
      },
      delivery_note: {
        type: Sequelize.TEXT,
        allowNull: false,
      },
      user_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      total_qty: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },      
      total_price: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      status: {
        type: Sequelize.ENUM,
        values: ["in_cart", "pending", "payed"],
        allowNull: false,
      },
      created_at: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      updated_at: {
        type: Sequelize.DATE,
        allowNull: false,
      },
    });    
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('orders');    
  }
};