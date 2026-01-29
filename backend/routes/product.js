 const express= require('express');
const router=express.Router();
const Product= require('../models/product');







router.get('/products', async (req, res) => {
    try {
        const products = await Product.findAll();
        res.status(200).json(products);
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: "Internal Server Error" });
    }
});

router.post('/products', async (req, res) => {
    try {
        const { name, description, price, image, category, stock, discountPercent } = req.body;
        if (!name || !description || !price || !image || !category) {
            return res.status(400).json({ message: "Name, description, price, image, and category are required" });
        }

        // Determine stock status based on stock count
        const stockStatus = parseInt(stock) > 0 ? 'instock' : 'outstock';

        const product = await Product.create({
            name,
            description,
            price,
            image,
            category,
            stock: parseInt(stock) || 0,
            discountPercent: parseInt(discountPercent) || 0,
            stockStatus
        });

        res.status(201).json({ message: "Product Created Successfully", product });
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: "Internal Server Error" });
    }
});

router.put('/products/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const { name, description, price, image, category, stock, discountPercent } = req.body;

        const product = await Product.findByPk(id);
        if (!product) {
            return res.status(404).json({ message: "Product not found" });
        }

        // Determine stock status based on stock count
        const stockStatus = parseInt(stock) > 0 ? 'instock' : 'outstock';

        await product.update({
            name,
            description,
            price,
            image,
            category,
            stock: parseInt(stock) || 0,
            discountPercent: parseInt(discountPercent) || 0,
            stockStatus
        });

        res.status(200).json({ message: "Product Updated Successfully", product });
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: "Internal Server Error" });
    }
});

router.delete('/products/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const product = await Product.findByPk(id);
        if (!product) {
            return res.status(404).json({ message: "Product not found" });
        }
        await product.destroy();
        res.status(200).json({ message: "Product Deleted Successfully" });
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: "Internal Server Error" });
    }
});

module.exports=router;
