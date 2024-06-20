import Order from '../models/order.model.js';
import Product from '../models/product.model.js';
import crypto from 'crypto';

const STATIC_USER_ID = '6623e6342c1f4f96950d98ce';

const hashCardInfo = (cardInfo) => {
  const hash = crypto.createHash('sha256');
  hash.update(cardInfo);
  return hash.digest('hex');
};

export const getOrder = async (req, res, next) => {
  try {
    const order = await Order.findOne({ userId: STATIC_USER_ID }).populate('products.productId');
    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }
    res.status(200).json(order);
  } catch (err) {
    next(err);
  }
};

export const createOrder = async (req, res, next) => {
  try {
    const { products, totalAmount, address, city, zipCode, country, cardNumber, expiryDate, cvv } = req.body;
    const hashedCardInfo = hashCardInfo(cardNumber + expiryDate + cvv);

    const newOrder = new Order({
      userId: STATIC_USER_ID,
      products,
      totalAmount,
      cardInfo: hashedCardInfo,
      address,
      city,
      zipCode,
      country
    });

    const savedOrder = await newOrder.save();

    await Product.updateMany(
      { _id: { $in: products.map(p => p.productId) } },
      { $set: { bought: true } }
    );

    res.status(201).json(savedOrder);
  } catch (err) {
    next(err);
  }
};

export const updateOrderStatus = async (req, res, next) => {
  try {
    const { orderId, status } = req.body;

    const updatedOrder = await Order.findByIdAndUpdate(
      orderId,
      { status },
      { new: true }
    );

    if (!updatedOrder) {
      return res.status(404).json({ message: 'Order not found' });
    }

    res.status(200).json(updatedOrder);
  } catch (err) {
    next(err);
  }
};

export const deleteOrder = async (req, res, next) => {
  try {
    const { orderId } = req.body;

    const deletedOrder = await Order.findByIdAndDelete(orderId);

    if (!deletedOrder) {
      return res.status(404).json({ message: 'Order not found' });
    }

    res.status(200).json({ message: 'Order deleted successfully' });
  } catch (err) {
    next(err);
  }
};

export const getUserOrders = async (req, res, next) => {
  try {
    const orders = await Order.find({ userId: STATIC_USER_ID }).populate('products.productId');
    res.status(200).json(orders);
  } catch (err) {
    next(err);
  }
};
