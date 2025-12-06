const express = require('express');
const app = express();
const { sequelize } = require('./config/database');
const User = require('./models/user');
const Admin = require('./models/admin');
const Order = require('./models/order');
const Product = require('./models/product');
const cors = require('cors');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const authenticateToken = require('./middleware/auth');
const Cart = require('./models/cart');

const JWT_SECRET = 'minaglitzy_secret_key'; // In production, use environment variable

app.use(express.json());

// 1) CORS FIRST (above any routes)
const allowed = ["http://localhost:3000", "http://127.0.0.1:3000"];
app.use(cors({
    origin(origin, cb) {
        if (!origin || allowed.includes(origin)) return cb(null, true);
        return cb(new Error("Not allowed by CORS"));
    },
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: false, // set true only if using cookies/sessions
}));
// Handle preflight for all routes
app.options("", cors());

sequelize.sync()
    .then(() => {
        console.log('Database & tables created!');
    });

app.get('/health', (req, res) => {
    res.status(200).json({ message: 'OK' });
});

app.post("/signup", async (req, res) => {
    try {
        const { name, email, password, phone } = req.body;
        if (!name || !email || !password || !phone) {
            return res.status(400).json({ message: "All Credentials are Required" });
        }

        const existingUser = await User.findOne({ where: { email } });
        if (existingUser) {
            return res.status(400).json({ message: "User already exists" });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await User.create({ name, password: hashedPassword, email, phone });

        if (user) {
            const token = jwt.sign({ id: user.id, email: user.email }, JWT_SECRET, { expiresIn: '1h' });
            res.status(201).json({ message: "User Created Successfully", user: { id: user.id, name: user.name, email: user.email, phone: user.phone }, token });
        } else {
            res.status(400).json({ message: "User Not Created" });
        }
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: "Internal Server Error" });
    }
});

app.post("/login", async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({ message: "All Credentials are Required" });
        }
        const user = await User.findOne({ where: { email } });
        if (!user) {
            return res.status(404).json({ message: "User not Found" });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ message: "Invalid Credentials" });
        }

        const token = jwt.sign({ id: user.id, email: user.email }, JWT_SECRET, { expiresIn: '1h' });
        res.status(200).json({ message: "Logged In Successfully", user: { id: user.id, name: user.name, email: user.email, phone: user.phone }, token });
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: "Internal Server Error" });
    }
});

app.post("/create-admin", async (req, res) => {
    try {
        const { name, password, email } = req.body;
        if (!name || !password || !email) {
            return res.status(401).json({ message: "All the Credentials are Required" });
        }
        const admin = await Admin.create({ name, password, email });
        if (admin) {
            res.status(201).json({ message: "Admin Created Successfully", admin });
        } else {
            res.status(401).json({ message: "Admin Not Created" });
        }
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: "Internal Server Error" });
    }
});

app.post('/admin-login', async (req, res) => {
    try {
        const { name, password } = req.body;
        if (!name || !password) {
            return res.status(401).json({ message: "All the Credentials are Required" });
        }
        const admin = await Admin.findOne({ where: { name: name, password: password } });
        if (admin) {
            const token = jwt.sign({ id: admin.id, email: admin.email, isAdmin: true }, JWT_SECRET, { expiresIn: '1h' });
            res.status(200).json({ message: "Admin Logged In Successfully", admin, token });
        } else {
            res.status(401).json({ message: "Admin Not Found" });
        }
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: "Internal Server Error" });
    }
});

app.get('/admin/me', authenticateToken, async (req, res) => {
    try {
        // Check if the token belongs to an admin
        if (!req.user.isAdmin) {
            return res.status(403).json({ message: "Access denied. Admins only." });
        }

        const admin = await Admin.findByPk(req.user.id, {
            attributes: { exclude: ['password'] }
        });
        if (admin) {
            res.status(200).json(admin);
        } else {
            res.status(404).json({ message: "Admin not found" });
        }
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: "Internal Server Error" });
    }
});

app.post('/orders', async (req, res) => {
    try {
        const { firstName, lastName, email, phone, address, totalAmount, price, items } = req.body;
        if (!firstName || !lastName || !email || !phone || !address || !totalAmount || !price) {
            return res.status(401).json({ message: "All the Credentials are Required" });
        }
        const order = await Order.create({ firstName, lastName, email, phone, address, totalAmount, price, items });
        if (order) {
            res.status(201).json({ message: "Order Created Successfully", order });
        } else {
            res.status(401).json({ message: "Order Not Created" });
        }
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: "Internal Server Error" });
    }
});

// PRODUCT ROUTES
app.get('/products', async (req, res) => {
    try {
        const products = await Product.findAll();
        res.status(200).json(products);
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: "Internal Server Error" });
    }
});

app.post('/products', async (req, res) => {
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

app.put('/products/:id', async (req, res) => {
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

app.delete('/products/:id', async (req, res) => {
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

app.get('/me', authenticateToken, async (req, res) => {
    try {
        const user = await User.findByPk(req.user.id, {
            attributes: { exclude: ['password'] }
        });
        if (user) {
            res.status(200).json(user);
        } else {
            res.status(404).json({ message: "User not found" });
        }
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: "Internal Server Error" });
    }
});

app.get('/my-orders', authenticateToken, async (req, res) => {
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

app.get('/all-orders', async (req, res) => {
    try {
        const orders = await Order.findAll({
            order: [
                ['createdAt', 'DESC']
            ]
        });
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




// CART ENDPOINTS  
app.post('/cart', authenticateToken, async (req, res) => {
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

app.delete('/cart', authenticateToken, async (req, res) => {
    try {
        const userId = req.user.id;
        const deleted = await Cart.destroy({ where: { userId } });
        res.status(200).json({ message: "Cart Cleared Successfully", deleted });
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: "Internal Server Error" });
    }
});

app.get('/cart-orders', authenticateToken, async (req, res) => {
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



















































































const PORT = process.env.PORT || 5006;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});