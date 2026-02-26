const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true }, // plain text
    role: { type: String, enum: ["Admin","Manager","Staff"], default: "Staff" },
    employeeId: { type: String, required: true, unique: true }
}, { timestamps: true });

module.exports = mongoose.model("User", userSchema);
