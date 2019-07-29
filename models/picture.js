const mongoose = require('mongoose');

const pictureSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    name: { type: String, required: true },
    type: { type: String, required: true },
    users: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
},
{ 
    timestamps: true
});

module.exports = mongoose.model('Picture', pictureSchema);