module.exports = (sequelize, DataTypes) => {
  const Orders = sequelize.define(
    "Orders",
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
      },
      delivery_methods: {
        type: DataTypes.ENUM,
        values: ["credit_card", "cash", "topup"],
        allowNull: false,
      },
      delivery_address: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      delivery_note: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      user_id: {
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
      status: {
        type: DataTypes.ENUM,
        values: ["in_cart", "pending", "payed"],
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
      tableName: "orders",
    }
  );

  Orders.associate=(models) => {
    Orders.belongsTo(models.User, {
      foreignKey: {
        name: 'user_id',
        allowNull: false,        
      },
      as: 'orders'
    })    

    Orders.hasMany(models.OrderDetail, {
      foreignKey: {
        name: 'order_id',
        allowNull: false
      },
      as : 'order'
    })
  }  

  return Orders;
  
};
