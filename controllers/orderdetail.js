const { OrderDetail } = require("../models/index");
const { Orders } = require("../models/index");
const { Products } = require("../models/index");
exports.getOrderDetailAll = async (req, res) => {
  try {
    const detailAll = await OrderDetail.findAll();
    const detailOrderWithOrder = await OrderDetail.findAll({
      include: [{ model: Orders, as: "order" }],
    });
    const detailOrderWithProduct = await OrderDetail.findAll({
      include: [{ model: Products, as: "product" }],
    });

    return res.json({
      success: true,
      message: "Order Detail Found",
      result: {
        product_id: detailOrderWithProduct,
        order_id: detailOrderWithOrder,
        total_qty: detailAll.total_qty,
        total_price: detailAll.total_price,
      },
    });
  } catch (error) {    
    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

exports.addOrderDetail = async (req, res) => {
  try {
      const orderDetailData = req.body 
      const createOrderDetailData = await OrderDetail.create(orderDetailData)

      const detailOrderWithOrder = await OrderDetail.findAll({
        include: [{ model: Orders, as: "order", where: { id: orderDetailData.order_id }}],
      });
      const detailOrderWithProduct = await OrderDetail.findAll({
        include: [{ model: Products, as: "product", where: { id: orderDetailData.product_id } }],
      });
      
      if(createOrderDetailData) {
          return res.json({
              success: true,
              message: "Success Create Order Detail",
              result: {
                product_id: detailOrderWithProduct,
                order_id: detailOrderWithOrder,
                total_qty: createOrderDetailData.total_qty,
                total_price: createOrderDetailData.total_price
              },            
            });
      }else {
          return res.json({
              success: false,
              message: "Failed Add orderDetail",
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

exports.updateOrderDetail = async (req, res) => {
  try {
      const id = req.params.id;
      const OrderDetailById = await OrderDetail.findByPk(id);
      const product = OrderDetailById.product_id;
      const product_id = await Products.findByPk(product)
      const order = OrderDetailById.order_id;
      const order_id = await Orders.findByPk(order)

      if (!OrderDetailById) {
          return res.status(404).json({
            success: false,
            message: "Order Detail not Found",
          });
      }

      let updateData = req.body;

      await OrderDetailById.update(updateData)

      return res.json({
          success: true,
          message: "Success update product",
          result: {
            id: OrderDetailById.id,
            product_id: product_id,
            order_id: order_id,
            total_qty: OrderDetailById.total_qty,
            total_price: OrderDetailById.total_price
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

exports.deleteOrderDetail = async (req, res) => {
  try {
    const orderDetail = await OrderDetail.findByPk(req.params.id);

    if (!orderDetail) {
      return res.status(404).json({
        success: false,
        message: "Order Detail not found",
      });
    }

    await orderDetails.destroy({ where: { id: req.params.id } });

    return res.json({
      success: true,
      message: "Success update Order Detail",
      result: {
        id: orderDetail.id,
        product_id: orderDetail.product_id,
        order_id: orderDetail.order_id,
        total_qty: orderDetail.total_qty,
        total_price: orderDetail.total_price,
      },
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};
