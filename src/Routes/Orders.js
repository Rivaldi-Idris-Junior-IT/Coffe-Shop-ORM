const express = require('express')
const orderController = require('../../controllers/orders')
const userRoutes = express.Router();

userRoutes.get('/', orderController.getOrdersAll);
userRoutes.post('/', orderController.addOrder);
userRoutes.put('/:id', orderController.updateOrder);
userRoutes.delete('/:id', orderController.deleteOrder);

module.exports = userRoutes