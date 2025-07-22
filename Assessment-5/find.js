const Student = require('./Student_App/backend/models/student.js')
const db = require('./Student_App/backend/models/db.js')

// Find Query - It will fetch all data from Database
Student.find({})
.then((data)=> console.log(data))
.catch((err)=> console.log(err))

// Aggregate Function Query
// It fetch birth year and count with +1 where same year 
Student.aggregate([
    {
        $group: {
            _id: { $year: "$stud_birthdate" },
            total: { $sum: 1 },
        }
    }
]).then(res => console.log(res))