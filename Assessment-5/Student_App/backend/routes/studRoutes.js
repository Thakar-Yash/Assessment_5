const express = require("express");
const router = express.Router();
const Student = require("../models/student.js");

router.post("/add", async (req, res) => {
  try {
    const student = new Student(req.body);
    await student.save();
    res.json({ message: "Student added", student });
  } catch (error) {
    console.log(error);
  }
});

router.get("/all", async (req, res) => {
  try {
    const students = await Student.find().sort("stud_id");
    res.json(students);
  } catch (error) {
    console.log(error);
  }
});

router.put("/edit/:id", async (req, res) => {
  try {
    const updatedStudent = await Student.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.json({
      message: "Student updated",
      updatedStudent: updatedStudent?.toObject?.() || updatedStudent,
    });
  } catch (error) {
    console.log(error);
  }
});

router.delete("/delete/:id", async (req, res) => {
  try {
    await Student.findByIdAndDelete(req.params.id);
    res.json({ message: "Student deleted" });
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
