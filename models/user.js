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
    },
    budgetLimit: {
        type: Number,
        default: 0
    }

}, { timeseries: true });
const User = mongoose.models.user || mongoose.model('user', signupSchema);
module.exports = User;