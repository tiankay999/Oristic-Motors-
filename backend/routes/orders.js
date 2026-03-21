const express = require('express');
const router = express.Router();
const Order = require('../models/order');
const authenticateToken = require('../middleware/auth');




router.post('/orders', authenticateToken, async (req, res) => {
    try {
        const { firstName, lastName, email, phone, address, totalAmount, items, deliveryMode, deliveryLocation } = req.body;
        if (!firstName || !lastName || !email || !phone || !address || !totalAmount) {
            return res.status(400).json({ message: "All fields are required" });
        }

        // Create order with items (including images) and delivery info
        const order = await Order.create({
            firstName, lastName, email, phone, address, totalAmount, items,
            deliveryMode: deliveryMode || 'pickup',
            deliveryLocation: deliveryLocation || null,
            deliveryStatus: 'processing'
        });
        if (order) {
            res.status(201).json({ message: "Order Created Successfully", order });
        } else {
            res.status(400).json({ message: "Order Not Created" });
        }
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: "Internal Server Error" });
    }
});









router.get('/my-orders',authenticateToken, async (req, res) => {
    try {
        const orders = await Order.findAll({ where: { email: req.user.email } });
        if (orders) {
            res.status(200).json(orders);
        } else {
            res.status(404).json({ message: "No orders found" });
        }
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: "Internal Server Error" });
    }
});


module.exports = router;