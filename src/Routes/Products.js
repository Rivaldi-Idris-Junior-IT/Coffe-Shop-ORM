const express = require('express')
const productController = require('../../controllers/products')
const userRoutes = express.Router();

userRoutes.get('/', productController.getProductsAll);
userRoutes.post('/', productController.addProduct);
userRoutes.put('/:id', productController.updateProduct);
userRoutes.delete('/:id', productController.deleteProduct);

module.exports = userRoutes