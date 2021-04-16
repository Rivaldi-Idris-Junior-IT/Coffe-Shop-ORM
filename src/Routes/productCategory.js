const express = require('express')
const productCategoryController = require('../../controllers/productCategory')
const userRoutes = express.Router();

userRoutes.get('/', productCategoryController.getProductCategoryAll);


module.exports = userRoutes