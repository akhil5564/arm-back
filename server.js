const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();
const app = express();
app.use(cors());
app.use(express.json());
const attendanceRoutes = require("./routes/attendanceRoutes"); 
//Routes
// Routes
app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/users", require("./routes/usersRoutes"));
app.use("/api/leaves", require("./routes/leaveRoutes"));
const adminRoutes = require("./routes/adminRoutes");

const allowedLocationRoutes =require("./routes/allowedLocationRoutes");

app.use("/api/attendance", attendanceRoutes);
app.use("/api/allowedLocation",allowedLocationRoutes);
const adminLocationRoutes = require("./routes/adminLocationRoutes");

app.use("/api/admin-location", adminLocationRoutes);
//app.use("/api/attendance", attendanceRoutes);
// TODO: add crm, attendance, leave routes
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser:true, useUnifiedTopology:true })
.then(()=>console.log("MongoDB connected"))
.catch(err=>console.log(err));
const PORT = process.env.PORT || 5000;
app.get("/", (req, res) => {
  res.send("Backend is running properly 🚀");
});
const crmRoutes = require("./routes/crmRoutes");
app.use("/api/crm", crmRoutes);
//app.listen(PORT, () => console.log(`Server running on ${PORT}`));
app.listen(PORT, "0.0.0.0", () => console.log(`Server running on ${PORT}`));
