const express = require('express');
const userRoutes = require('./Users');
const router = express.Router();

const productRoutes = require('./Products')
const orderRoutes = require('./Orders')
const orderDetailRoutes = require('./OrderDetails')
const productCategoryRoutes = require('./productCategory')


// Link url users
router.use('/users', userRoutes);
// Link url products
router.use('/products', productRoutes);
// Link url orders
router.use('/orders', orderRoutes);
// Link url orders
router.use('/orderdetail', orderDetailRoutes);
// Link url orders
router.use('/productcategory', productCategoryRoutes);


router.all("*", (req, res) => {
    return res.status(404).json({
        messages: "url is not valid, please check the documentation"
    });
});

module.exports = router;