const Task = require("../models/Task");


// ✅ GET ALL TASKS
exports.getTasks = async (req, res) => {
  try {
    const tasks = await Task.find().sort({ createdAt: -1 });
    res.json(tasks);
  } catch (error) {
    console.log("Get Tasks Error:", error);
    res.status(500).json({ message: "Failed to fetch tasks" });
  }
};


// ✅ CREATE TASK
exports.createTask = async (req, res) => {
  try {
    const newTask = new Task(req.body);
    const savedTask = await newTask.save();
    res.json(savedTask);
  } catch (error) {
    console.log("Create Task Error:", error);
    res.status(500).json({ message: "Failed to create task" });
  }
};


// ✅ UPDATE TASK (EDIT)
exports.updateTask = async (req, res) => {
  try {
    const updatedTask = await Task.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true } // important
    );

    if (!updatedTask) {
      return res.status(404).json({ message: "Task not found" });
    }

    res.json(updatedTask);
  } catch (error) {
    console.log("Update Task Error:", error);
    res.status(500).json({ message: "Failed to update task" });
  }
};


// ✅ DELETE TASK
exports.deleteTask = async (req, res) => {
  try {
    const deletedTask = await Task.findByIdAndDelete(req.params.id);

    if (!deletedTask) {
      return res.status(404).json({ message: "Task not found" });
    }

    res.json({ message: "Task deleted successfully" });
  } catch (error) {
    console.log("Delete Task Error:", error);
    res.status(500).json({ message: "Failed to delete task" });
  }
};