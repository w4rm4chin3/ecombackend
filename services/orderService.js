const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const _ = require("lodash");
const CreateError = require("http-errors");
const logger = require("../utils/logger");
require("dotenv").config();

// exports.createOrder = async (data) => {
//   try {
//     const order = await prisma.orders.create({
//       data: {
//         customer_id: data.customer_id,
//         first_name: data.first_name,
//         last_name: data.last_name,
//         address: data.address,
//         town: data.town,
//         pincode: data.postalCode,
//         payment_status: "PENDING",
//         order_status: "PROCESSING",
//         phone: data.phone,
//         email: data.email,
//         grand_total: data.grand_total,
//         shipping_rate: data.shipping_rate,
//       }
//     });
//     if (order) {
//         return order;
//     }
        
//   } catch (err) {
//     next(err);
//   }
// };

exports.getOrders = async () => {
  try {
    const orders = await prisma.orders.findMany({
      where: {
        user: {
          id: req.user.id,
        },
      },
    });
    if (!orders) {
      throw new CreateError(400, "No orders found");
    }
    return orders;
  } catch (err) {
    next(err);
  }
};

exports.getOrderById = async () => {
  try {
    const order = await prisma.orders.findUnique({
      where: {
        id: req.params.id,
      },
    });
    if (!order) {
      throw new CreateError(400, "Order not found");
    }
    return order;
  } catch (err) {
    next(err);
  }
};

exports.updateOrder = async () => {
  try {
    const order = await prisma.orders.update({
      where: {
        id: req.params.id,
      },
      data: {
        status: req.body.status,
      },
    });
    if (!order) {
      throw new CreateError(400, "Order not found");
    }
    return order;
  } catch (err) {
    next(err);
  }
};

exports.deleteOrder = async () => {
  try {
    const order = await prisma.orders.delete({
      where: {
        id: req.params.id,
      },
    });
    if (!order) {
      throw new CreateError(400, "Order not found");
    }
    return order;
  } catch (err) {
    next(err);
  }
};
