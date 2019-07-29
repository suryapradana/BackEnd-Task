const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    name: { type: String, required: true },
    email: { type: String, required: true },
    age: { type: Number, required: true },
    pictures: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Picture'
    }]
},
{ 
    timestamps: true
});

module.exports = mongoose.model('User', userSchema);