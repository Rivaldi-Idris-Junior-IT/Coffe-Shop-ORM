const { ProductCategory } = require("../models/index");

exports.getProductCategoryAll = async (req, res) => {
    try {
        const productcategory = await ProductCategory.findAll();        
    
        return res.json({
          success: true,
          message: "Product Category",
          result: productcategory,            
        });
      } catch (error) {
        console.log(error)
          return res.status(400).json({
              success: false,
              message: error.message
          })
      }
}