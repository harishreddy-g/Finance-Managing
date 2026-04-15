const mongoose = require('mongoose');
const signupSchema = new mongoose.Schema({
    name: {
        type: String,
        require: true
    },
    email: {
        type: String,
        require: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    }

}, { timeseries: true });
const user = mongoose.model('user', signupSchema);
module.exports = user;