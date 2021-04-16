const { Orders } = require("../models/index");
const { User } = require("../models/index");
exports.getOrdersAll = async (req, res) => {
  try {
    const orders = await Orders.findAll({
      include: [{ model: User, as: "orders" }],
    });

    if (orders) {
      return res.json({
        success: true,
        message: "Orders all found",
        result: orders,
      });
    } else {
      return res.status(400).json({
        success: false,
        message: error.message,
      });
    }
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};


exports.addOrder = async (req, res) => {
  try {
      const orderData = req.body 
      const createOrderData = await Orders.create(orderData)
      const listOrderData = await Orders.findByPk(createOrderData.id, { include: [{ model: User, as: "orders" }] })
      
      if(createOrderData) {
          return res.json({
              success: true,
              message: "Success Create order",
              result: listOrderData,            
            });
      }else {
          return res.json({
              success: false,
              message: "Failed Add order",
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


exports.updateOrder = async (req, res) => {
  try {
      const id = req.params.id;
      const formUser = req.body.user_id
      const orderById = await Orders.findByPk(id);
      const listOrderData = await User.findOne( { where: { id: formUser } })
      

      if (!orderById) {
          return res.status(404).json({
            success: false,
            message: "Order not Found",
          });
      }

      let updateData = req.body;

      await orderById.update(updateData)

      return res.json({
          success: true,
          message: "Success update order",
          result: {
            id: orderById.id,
            delivery_methods: orderById.delivery_methods,
            delivery_address: orderById.delivery_address,
            delivery_note: orderById.delivery_note,
            user_id: listOrderData,
            total_qty: orderById.total_qty,
            total_price: orderById.total_price,
            status: orderById.status,
            
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

exports.deleteOrder = async (req, res) => {
  try {
    const order = await Orders.findByPk(req.params.id);

    if (!order) {
      return res.status(404).json({
        success: false,
        message: "order not found",
      });
    }

    await Orders.destroy({ where: { id: req.params.id } });

    return res.json({
      success: true,
      message: "Success delete order",
      result: {
        delivery_method: order.delivery_method,
        delivery_address: order.delivery_address,
        delivery_note: order.delivery_note,
        user_id: order.user_id,
        total_qty: order.total_qty,
        total_price: order.total_price,
      },
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};
