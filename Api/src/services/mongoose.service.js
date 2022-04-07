const mongoose = require("mongoose");
const config = require("../../configs");
const uri = config.database.url;

exports.dbConnect = () => {
    mongoose.connect(uri).then(() => {
        console.log("successfully connected to the database")
    }).catch(err => {
            console.log("couldnt connect to the database", err);
            process.exit();
    });
} 