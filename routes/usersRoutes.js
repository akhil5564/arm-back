/*
const express = require("express");
const router = express.Router();

const User = require("../models/User");
///////////////////////////////////////////////////////

//////////////////////////////////////////////////////////

// ✅ GET all users
router.get("/", async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});


// ✅ ADD new user
router.post("/", async (req, res) => {
  try {
    const newUser = new User({
      employeeId: req.body.employeeId,
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
      role: req.body.role
    });

    const savedUser = await newUser.save();
    res.json(savedUser);

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});


// ✅ UPDATE user
router.put("/:id", async (req, res) => {
  try {
    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    res.json(updatedUser);

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});


// ✅ DELETE user
router.delete("/:id", async (req, res) => {
  try {
    const id = req.params.id;
    console.log("Deleting ID received:", id);

    const user = await User.findById(id);
    if (!user) {
      console.log("User not found");
      return res.status(404).json({ message: "User not found" });
    }

    await User.findByIdAndDelete(id);
    console.log("User deleted successfully");

    res.json({ message: "User deleted successfully" });
  } catch (err) {
    console.log("Delete route error:", err);
    res.status(500).json({ message: err.message });
  }
});
// ✅ Update profile
// ✅ Update profile using employeeId
// ✅ Update profile using employeeId
router.put("/update-profile", async (req, res) => {

  try {

    const { employeeId, email, password } = req.body;

    if (!employeeId) {
      return res.status(400).json({
        message: "EmployeeId required"
      });
    }

    const user = await User.findOne({ employeeId });

    if (!user) {
      return res.status(404).json({
        message: "User not found"
      });
    }

    // update email
    user.email = email;

    // update password if provided
    if (password && password.trim() !== "") {
      user.password = password;
    }

    await user.save();

    res.json({
      message: "Profile updated successfully",
      user
    });

  } catch (error) {

    console.log(error);

    res.status(500).json({
      message: "Server error"
    });

  }

});

// ✅ GET logged-in user profile
router.get("/me", async (req, res) => {
  try {

    const employeeId = req.query.employeeId;

    if (!employeeId) {
      return res.status(400).json({
        message: "EmployeeId required"
      });
    }

    const user = await User.findOne({
      employeeId: employeeId
    }).select("-password");

    if (!user) {
      return res.status(404).json({
        message: "User not found"
      });
    }

    res.json(user);

  } catch (err) {

    console.log("ME route error:", err);

    res.status(500).json({
      message: err.message
    });

  }
});
// ✅ Update profile using employeeId
router.put("/update-profile", async (req, res) => {

  try {

    const { employeeId, email, password } = req.body;

    console.log("Update request received:", req.body);

    // check required
    if (!employeeId) {
      return res.status(400).json({
        message: "EmployeeId is required"
      });
    }

    // find user using employeeId
    const user = await User.findOne({ employeeId });

    if (!user) {
      return res.status(404).json({
        message: "User not found"
      });
    }

    // update email
    if (email) {
      user.email = email;
    }

    // update password only if provided
    if (password && password.trim() !== "") {
      user.password = password;
    }

    // save to MongoDB
    const updatedUser = await user.save();

    console.log("User updated in DB:", updatedUser);

    res.json({
      success: true,
      message: "Profile updated successfully",
      user: updatedUser
    });

  } catch (error) {

    console.log("Update error:", error);

    res.status(500).json({
      message: "Server error"
    });

  }

});




module.exports = router;
 */










//////////////////////////////////////////////////////(19/3/2026)
/*
const express = require("express");
const router = express.Router();

const User = require("../models/User");

///////////////////////////////////////////////////////

// ✅ GET all users
router.get("/", async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// ✅ ADD new user
router.post("/", async (req, res) => {
  try {
    const newUser = new User({
      employeeId: req.body.employeeId,
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
      role: req.body.role
      phone: req.body.phone   // ✅ ADD THISs
    });

    const savedUser = await newUser.save();
    res.json(savedUser);

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});


// ✅ Update profile using employeeId
// IMPORTANT: This MUST come BEFORE "/:id"
router.put("/update-profile", async (req, res) => {
  try {

    const { employeeId, email, password } = req.body;

    console.log("Update request received:", req.body);

    if (!employeeId) {
      return res.status(400).json({
        message: "EmployeeId is required"
      });
    }

    const user = await User.findOne({ employeeId });

    if (!user) {
      return res.status(404).json({
        message: "User not found"
      });
    }

    if (email) {
      user.email = email;
    }

    if (password && password.trim() !== "") {
      user.password = password;
    }

    const updatedUser = await user.save();

    res.json({
      success: true,
      message: "Profile updated successfully",
      user: updatedUser
    });

  } catch (error) {

    console.log("Update error:", error);

    res.status(500).json({
      message: "Server error"
    });

  }
});


// ✅ UPDATE user by ID
// MUST stay AFTER update-profile
router.put("/:id", async (req, res) => {
  try {
    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    res.json(updatedUser);

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});


// ✅ DELETE user
router.delete("/:id", async (req, res) => {
  try {
    const id = req.params.id;
    console.log("Deleting ID received:", id);

    const user = await User.findById(id);
    if (!user) {
      console.log("User not found");
      return res.status(404).json({ message: "User not found" });
    }

    await User.findByIdAndDelete(id);
    console.log("User deleted successfully");

    res.json({ message: "User deleted successfully" });
  } catch (err) {
    console.log("Delete route error:", err);
    res.status(500).json({ message: err.message });
  }
});


// ✅ GET logged-in user profile
router.get("/me", async (req, res) => {
  try {

    const employeeId = req.query.employeeId;

    if (!employeeId) {
      return res.status(400).json({
        message: "EmployeeId required"
      });
    }

    const user = await User.findOne({
      employeeId: employeeId
    }).select("-password");

    if (!user) {
      return res.status(404).json({
        message: "User not found"
      });
    }

    res.json(user);

  } catch (err) {

    console.log("ME route error:", err);

    res.status(500).json({
      message: err.message
    });

  }
});


module.exports = router;
*/
//////////////////////////////////////////////////////////
const express = require("express");
const router = express.Router();

const User = require("../models/User");

///////////////////////////////////////////////////////

// ✅ GET all users
router.get("/", async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

///////////////////////////////////////////////////////

// ✅ ADD new user
router.post("/", async (req, res) => {
  try {
    const newUser = new User({
      employeeId: req.body.employeeId,
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
      role: req.body.role,
      phone: req.body.phone   // ✅ FIXED (comma added)
    });

    const savedUser = await newUser.save();
    res.json(savedUser);

  } catch (err) {
    console.log("Create user error:", err);
    res.status(500).json({ message: err.message });
  }
});

///////////////////////////////////////////////////////

// ✅ Update profile using employeeId
router.put("/update-profile", async (req, res) => {
  try {

    const { employeeId, email, password, phone } = req.body;

    if (!employeeId) {
      return res.status(400).json({
        message: "EmployeeId is required"
      });
    }

    const user = await User.findOne({ employeeId });

    if (!user) {
      return res.status(404).json({
        message: "User not found"
      });
    }

    if (email) user.email = email;

    if (password && password.trim() !== "") {
      user.password = password;
    }

    if (phone) user.phone = phone; // ✅ ADD THIS

    const updatedUser = await user.save();

    res.json({
      success: true,
      message: "Profile updated successfully",
      user: updatedUser
    });

  } catch (error) {

    console.log("Update error:", error);

    res.status(500).json({
      message: "Server error"
    });

  }
});

///////////////////////////////////////////////////////

// ✅ UPDATE user by ID
router.put("/:id", async (req, res) => {
  try {
    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    res.json(updatedUser);

  } catch (err) {
    console.log("Update by ID error:", err);
    res.status(500).json({ message: err.message });
  }
});

///////////////////////////////////////////////////////

// ✅ DELETE user
router.delete("/:id", async (req, res) => {
  try {
    const id = req.params.id;

    const user = await User.findById(id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    await User.findByIdAndDelete(id);

    res.json({ message: "User deleted successfully" });

  } catch (err) {
    console.log("Delete route error:", err);
    res.status(500).json({ message: err.message });
  }
});

///////////////////////////////////////////////////////

// ✅ GET logged-in user profile
router.get("/me", async (req, res) => {
  try {

    const employeeId = req.query.employeeId;

    if (!employeeId) {
      return res.status(400).json({
        message: "EmployeeId required"
      });
    }

    const user = await User.findOne({
      employeeId: employeeId
    }).select("-password");

    if (!user) {
      return res.status(404).json({
        message: "User not found"
      });
    }

    res.json(user);

  } catch (err) {

    console.log("ME route error:", err);

    res.status(500).json({
      message: err.message
    });

  }
});

///////////////////////////////////////////////////////

module.exports = router;