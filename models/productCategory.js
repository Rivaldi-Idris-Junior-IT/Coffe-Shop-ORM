module.exports = (sequelize, DataTypes) => {
    const ProductCategory = sequelize.define(
      "ProductCategory",
      {
        id: {
          type: DataTypes.INTEGER,
          autoIncrement: true,
          primaryKey: true,
          allowNull: false,
        },
        category_name: {
          type: DataTypes.STRING,
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
        tableName: "productcategory",
      }
    );
  
    
  
    return ProductCategory
  };
  