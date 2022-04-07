const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const emailSchema = new Schema({
    to: String,
    from: String,
    subject: String,
    html: String,
    duration: Number
},
    { timestamps: true }
);

module.exports = mongoose.model('Email', emailSchema);