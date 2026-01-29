const app= require("express");
const router = app.Router();
const User= require('../models/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');








router.post("/signup", async (req, res) => {
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
            const token = jwt.sign({ id: user.id, email: user.email }, process.env.JWT_SECRET, { expiresIn: '1h' });
            res.status(201).json({ message: "User Created Successfully", user: { id: user.id, name: user.name, email: user.email, phone: user.phone }, token });
        } else {
            res.status(400).json({ message: "User Not Created" });
        }
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: "Internal Server Error" });
    }
});







module.exports = router;