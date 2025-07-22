const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const db = require('./models/db.js')
const path = require('path')
const StudentRoutes = require('./routes/studRoutes')

const app = express()
app.use(express.json())
app.use(express.static(path.join(__dirname,"../frontend")))
app.use(cors())
app.use("/api/students", StudentRoutes);

app.listen(5000, () => {
  console.log("Server running at http://localhost:5000");
})