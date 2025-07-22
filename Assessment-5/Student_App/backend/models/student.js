const mongoose = require('mongoose')

const studentSchema = new mongoose.Schema({
    stud_id: Number,
    stud_name: String,
    stud_email: String,
    stud_birthdate: Date,
});

const Student = mongoose.model("stud_mst", studentSchema);
module.exports = Student;