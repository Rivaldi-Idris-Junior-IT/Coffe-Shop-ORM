'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert(
      "productcategory",
      [
        {
          category_name: "minuman",
          created_at: new Date(),
          updated_at: new Date()
        },
        {
          category_name: "makanan",
          created_at: new Date(),
          updated_at: new Date()
        },
        {
          category_name: "snack",
          created_at: new Date(),
          updated_at: new Date()
        },
      ],
      {}
    );
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('productcategory', null, {});
  }
};
