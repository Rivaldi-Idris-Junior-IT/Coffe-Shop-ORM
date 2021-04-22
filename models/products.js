module.exports = (sequelize, DataTypes) => {
  const Products = sequelize.define(
    "Products",
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
      },
      product_name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      regular_price: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      sale_price: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      description: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      images: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      cloudinary_id: {
        type: DataTypes.STRING,
        allowNull: false
      },
      createdAt: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      updatedAt: {
        type: DataTypes.DATE,
        allowNull: false,
      },
    },
    {
      tableName: "products",
    }
  );

  Products.associate = (models) => {    
    Products.hasMany(models.OrderDetail, {
      foreignKey: {
        name: 'product_id',
        allowNull: false
      },
      as : 'product'
    })
  }

  return Products
};
