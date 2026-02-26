const User = require("../models/User");
const jwt = require("jsonwebtoken");

// REGISTER USER
exports.register = async (req, res) => {
    const { name, email, password, role, employeeId } = req.body;
    try {
        // Check if email or employeeId already exists
        const existingUser = await User.findOne({ $or: [{email}, {employeeId}] });
        if(existingUser) return res.status(400).json({ error: "Email or Employee ID already exists" });

        const user = await User.create({ name, email, password, role, employeeId });
        res.status(201).json({ success: true, user });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// LOGIN USER
exports.login = async (req, res) => {
    const { email, password } = req.body;
    try {
        // Find user with matching email and password
        const user = await User.findOne({ email, password });
        if(!user) return res.status(400).json({ error: "Invalid credentials" });

        // Create JWT token
        const token = jwt.sign(
            { id: user._id, role: user.role, employeeId: user.employeeId },
            process.env.JWT_SECRET,
            { expiresIn: "7d" }
        );

        res.json({ success: true, token, user });
    } catch(err) {
        res.status(500).json({ error: err.message });
    }
};
