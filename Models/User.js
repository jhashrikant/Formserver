const mongoose = require('mongoose');


const userSchema = new mongoose.Schema({
    name: String,
    age: Number,
    Gender: String,
    Interest: [{
        type: String,
    }],
    photo: {
        data: Buffer, // Store photo as binary data
        contentType: String,
    },
})
mongoose.models = {}
module.exports = mongoose.model('User', userSchema)