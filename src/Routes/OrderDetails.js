const express = require('express')
const orderDetailController = require('../../controllers/orderdetail')
const userRoutes = express.Router();

userRoutes.get('/', orderDetailController.getOrderDetailAll);
userRoutes.post('/', orderDetailController.addOrderDetail);
userRoutes.put('/:id', orderDetailController.updateOrderDetail);
userRoutes.delete('/:id', orderDetailController.deleteOrderDetail);


module.exports = userRoutes