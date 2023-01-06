const mongoose = require("mongoose");
mongoose.set('strictQuery', true);
mongoose.connect("mongodb://localhost:27017/jobListUsers").then(() => {
    console.log("database connection successful")
}).catch((err) => {
    console.log(err);
});