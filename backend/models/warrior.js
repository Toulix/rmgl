const mongoose = require('mongoose');

const Warrior = mongoose.model('Warrior', new mongoose.Schema({
    name: {
        type: String, 
        required: true
    },
    hp: {
        type: Number,
        default: 100,
        required: true
    },
    mp: {
        type: Number,
        default: 30,
        max: 100,
        required: true
    },
    st: {
        type: Number,
        default: 40,
        max: 100,
        required: true
    },
    type: {
        type: String,
        required: true,
        enum: ['Gaulois', 'Roumain']
    },
    creator: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }

}));

module.exports = Warrior;