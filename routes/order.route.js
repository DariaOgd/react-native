// routes/order.route.js
import express from 'express';
import { getOrder, createOrder, updateOrderStatus, deleteOrder, getUserOrders } from '../controllers/order.controller.js';

const router = express.Router();

router.get('/', getOrder);
router.post('/create', createOrder);
router.post('/update-status', updateOrderStatus);
router.post('/delete', deleteOrder);
router.get('/user', getUserOrders); // Assuming you want to fetch user orders without authentication

export default router;
