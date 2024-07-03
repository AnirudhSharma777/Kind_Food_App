const mongoose = require("mongoose");
require("dotenv").config();

const dbConnect = mongoose.connect(process.env.MONGODB,{

    useNewUrlParser : true,
    useUnifiedTopology:true,
}).then(() => {
    console.log("Database is Connect SuccessFully..");
}).catch((error) =>{
    console.log("Database is failed to connect...try again!");
    console.log(error.message);
    process.exit(1);
});

module.exports = dbConnect;