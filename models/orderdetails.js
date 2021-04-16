'use strict';
require('dotenv').config()
module.exports = (sequelize, DataTypes) => {
  const OrderDetail = sequelize.define(
    "OrderDetail",
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
      },
      product_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      order_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      total_qty: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      total_price: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      created_at: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      updated_at: {
        type: DataTypes.DATE,
        allowNull: false,
      },
    },
    {
      tableName: "orderdetail",
    }
  );

  OrderDetail.associate=(models) => {

    OrderDetail.belongsTo(models.Orders, {
      foreignKey: {
        name: 'order_id',
        allowNull: false,        
      },
      as: 'order'
    })    

    OrderDetail.belongsTo(models.Products, {
      foreignKey: {
        name: 'product_id',
        allowNull: false,        
      },
      as: 'product'
    })    
  }

  return OrderDetail;
};
