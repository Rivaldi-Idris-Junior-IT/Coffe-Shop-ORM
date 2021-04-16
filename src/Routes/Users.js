const express = require('express')
const userController = require('../../controllers/users')
const userRoutes = express.Router();

userRoutes.get('/', userController.getUserAll);
userRoutes.post('/register', userController.register);
userRoutes.post('/login', userController.login);
userRoutes.put('/:id', userController.updateUser);
userRoutes.get('/:id', userController.getUserById);
userRoutes.delete('/:id', userController.deleteUser);

module.exports = userRoutes;