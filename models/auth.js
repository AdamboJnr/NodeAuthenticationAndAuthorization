const mongoose = require('mongoose');

const authSchema = new mongoose.Schema({
    email:{
        type: String,
        required: [true, "Please Provide email"],
        trim: true,
        maxlength: [100, "Email should be less than 100 characters"]
    },
    password: {
        type: String,
        required: [true, "Please provide a password"],
        trim: true,
        maxlength: [100, "Password should not exceed 100 characters"]
    }
});

module.exports = mongoose.model("Auth", authSchema);