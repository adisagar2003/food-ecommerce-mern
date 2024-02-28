const mongoose = require("mongoose")
require('dotenv').config();

module.exports = function ConnectDB() {
    mongoose.connect(process.env.MONGODB_URI);
    mongoose.connection.on('connected', () => {
        console.log('database connected');
    })
}