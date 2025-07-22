const mongoose = require('mongoose')

mongoose.connect("mongodb://localhost:27017/TOPS_DB")
// .then(()=> console.log('Conneted to TOPS Databse'))
.catch((err)=> console.log(err))