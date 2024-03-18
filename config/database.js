const mongoose = require("mongoose");
require("dotenv").config();

exports.connect = async () => {
    try {
        await mongoose.connect(process.env.MONGDB_URL, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log("db connected successfully");
    } catch (error) {
        console.log('db connection issue');
        console.log(error);
        process.exit(1);
    }
};
