const express = require('express');
const app = express();
const { sequelize } = require('./config/database');
const User = require('./models/user');
const Admin = require('./models/admin');
const Order = require('./models/order');
const ProductRoutes = require('./routes/product');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const authenticateToken = require('./middleware/auth');
const CartRoutes = require('./routes/cart');
const SignupRoutes = require('./routes/signup');
const LoginRoutes = require('./routes/login');
const OrdersRoutes = require('./routes/orders');


require('dotenv').config();


app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));

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
//sigup api 
app.use('/api', SignupRoutes)


// login 
app.use("/api", LoginRoutes)


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
            const token = jwt.sign({ id: admin.id, email: admin.email, isAdmin: true }, process.env.JWT_SECRET, { expiresIn: '1h' });
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

// PRODUCT ROUTES//
app.use('/api', ProductRoutes);



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


//orders routes//
app.use('/api', OrdersRoutes)







// all orders api//









///this the admins endpoint for orders //


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




// CART ENDPOINTS//
app.use('/api', CartRoutes);




















































































const PORT = process.env.PORT || 5006;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});