import Cart from '../models/cart.model.js';
import Product from '../models/product.model.js';

const HARD_CODED_USER_ID = '6623e6342c1f4f96950d98ce';

export const getCart = async (req, res, next) => {
  try {
    const cart = await Cart.findOne({ userId: HARD_CODED_USER_ID }).populate('products.productId');
    if (!cart) {
      return res.status(404).json({ message: 'Cart not found' });
    }
    res.status(200).json(cart);
  } catch (err) {
    next(err);
  }
};

export const addToCart = async (req, res, next) => {
  try {
    const { productId, quantity } = req.body;
    const userId = HARD_CODED_USER_ID;

    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    let cart = await Cart.findOne({ userId });
    if (!cart) {
      cart = new Cart({ userId, products: [] });
    }

    const productIndex = cart.products.findIndex(p => p.productId.equals(productId));
    if (productIndex !== -1) {
      cart.products[productIndex].quantity += quantity;
    } else {
      cart.products.push({ productId, quantity });
    }

    const updatedCart = await cart.save();
    res.status(200).json(updatedCart);
  } catch (err) {
    console.error('Error adding product to cart:', err);
    next(err);
  }
};

export const removeFromCart = async (req, res, next) => {
  try {
    const { productId } = req.body;

    let cart = await Cart.findOne({ userId: HARD_CODED_USER_ID });
    if (!cart) {
      return res.status(404).json({ message: 'Cart not found' });
    }

    cart.products = cart.products.filter(p => !p.productId.equals(productId));

    const updatedCart = await cart.save();
    res.status(200).json(updatedCart);
  } catch (err) {
    console.error('Error removing product from cart:', err);
    next(err);
  }
};


export const clearCart = async (req, res, next) => {
  try {
    const cart = await Cart.findOneAndUpdate(
      { userId: HARD_CODED_USER_ID },
      { $set: { products: [] } },
      { new: true }
    );
    if (!cart) {
      return res.status(404).json({ message: 'Cart not found' });
    }
    res.status(200).json(cart);
  } catch (err) {
    next(err);
  }
};
