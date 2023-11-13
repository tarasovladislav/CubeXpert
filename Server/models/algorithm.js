const mongoose = require('mongoose');

const algorithmSchema = {
    title: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    picturePath: {
        type: String,
        required: true
    },
    subset: {
        type: String,
        required: true
    },
    algo: {
        type: [String],
        required: true
    },
    colored: {
        type: String,
        required: false
    },
    setupmoves: {
        type: String,
        required: false
    }

}

module.exports = mongoose.model('Algorithm', algorithmSchema);



