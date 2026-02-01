const express = require('express');
const router = express.Router();
const Product = require('../models/product');







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
        const { name, description, price, images, category, stock, discountPercent } = req.body;

        // Validate required fields
        if (!name || !description || !price || !category) {
            return res.status(400).json({ message: "Name, description, price, and category are required" });
        }

        // Validate images - must have at least one image, max 3
        const imageArray = Array.isArray(images) ? images.filter(img => img && img.trim()) : [];
        if (imageArray.length === 0) {
            return res.status(400).json({ message: "At least one image is required" });
        }
        if (imageArray.length > 3) {
            return res.status(400).json({ message: "Maximum 3 images allowed" });
        }

        // Determine stock status based on stock count
        const stockStatus = parseInt(stock) > 0 ? 'instock' : 'outstock';

        const product = await Product.create({
            name,
            description,
            price,
            images: imageArray,
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
        const { name, description, price, images, category, stock, discountPercent } = req.body;

        const product = await Product.findByPk(id);
        if (!product) {
            return res.status(404).json({ message: "Product not found" });
        }

        // Validate images if provided - max 3
        let imageArray = undefined;
        if (images !== undefined) {
            imageArray = Array.isArray(images) ? images.filter(img => img && img.trim()) : [];
            if (imageArray.length > 3) {
                return res.status(400).json({ message: "Maximum 3 images allowed" });
            }
        }

        // Determine stock status based on stock count
        const stockStatus = parseInt(stock) > 0 ? 'instock' : 'outstock';

        await product.update({
            name,
            description,
            price,
            ...(imageArray !== undefined && { images: imageArray }),
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

module.exports = router;
