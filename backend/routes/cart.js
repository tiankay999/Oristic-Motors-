const express= require('express');
const router= express.Router();
const Cart= require('../models/cart');
const authenticateToken= require('../middleware/auth');





router.post('/cart', authenticateToken, async (req, res) => {
    try {
        const userId = req.user.id;
        const { productname, price, quantity, productId } = req.body;
        const cart = await Cart.create({ userId, productname, price, quantity, productId });
        if (cart) {
            res.status(201).json({ message: "Cart Created Successfully", cart });
        } else {
            res.status(401).json({ message: "Cart Not Created" });
        }
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: "Internal Server Error" });
    }
});

router.delete('/cart', authenticateToken, async (req, res) => {
    try {
        const userId = req.user.id;
        const deleted = await Cart.destroy({ where: { userId } });
        res.status(200).json({ message: "Cart Cleared Successfully", deleted });
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: "Internal Server Error" });
    }
});

router.get('/cart-orders', authenticateToken, async (req, res) => {
    try {
        const userId = req.user.id;
        const cart = await Cart.findAll({ where: { userId } });
        if (cart) {
            res.status(200).json(cart);
        } else {
            res.status(404).json({ message: "No cart found" });
        }
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: "Internal Server Error" });
    }
});

module.exports=router;