const { Products } = require("../models/index");

exports.getProductsAll = async (req, res) => {
    try {
        const products = await Products.findAll();        
    
        return res.json({
          success: true,
          message: "Products all found",
          result: products,            
        });
      } catch (error) {
        console.log(error)
          return res.status(400).json({
              success: false,
              message: error.message
          })
      }
}


exports.addProduct = async (req, res) => {
    try {
        const productData = req.body 
        const createProductData = await Products.create(productData)
        
        if(createProductData) {
            return res.json({
                success: true,
                message: "Success Create Product",
                result: createProductData,            
              });
        }else {
            return res.json({
                success: false,
                message: "Failed Add Product",
              });
        }

    } catch (error) {
        console.log(error);
        return res.json({
        success: false,
        message: message.error,
        });
    }
}

exports.updateProduct = async (req, res) => {
    try {
        const id = req.params.id;
        const productById = await Products.findByPk(id);

        if (!productById) {
            return res.status(404).json({
              success: false,
              message: "User not Found",
            });
        }

        let updateData = req.body;

        await productById.update(updateData)

        return res.json({
            success: true,
            message: "Success update product",
            result: {
              id: productById.id,
              product_name: productById.product_name,
              regular_price: productById.regular_price,
              sale_price: productById.sale_price,
              description: productById.description,
              images: productById.images,
            },
          });
    } catch (error) {
        console.log(error);
        return res.json({
        success: false,
        message: message.error,
        });
    }
}

exports.deleteProduct = async (req, res) => {
    try {
      const product = await Products.findByPk(req.params.id);
  
      if (!product) {
        return res.status(404).json({
          success: false,
          message: "product not found",
        });
      }
  
      await Products.destroy({ where: { id: req.params.id } });
  
      return res.json({
        success: true,
        message: "Success update product",
        result: {
          id: product.id,
          product_name: product.product_name,
          regular_price: product.regular_price,
          sale_price: product.sale_price,
          description: product.description,
          images: product.images,
        },
      });
    } catch (error) {
      return res.status(400).json({
        success: false,
        message: error.message,
      });
    }
  };
  