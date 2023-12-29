const mongoose = require('mongoose');

const url = 'mongodb+srv://shrikantjha:Shri%402611@cluster0.tcae4gn.mongodb.net/AiNxt'


async function connectToMongoDb() {
    try {
        await mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true })
    } catch (error) {
        console.error('some error occured connecting to Mongodb')
    }
}

module.exports = connectToMongoDb;