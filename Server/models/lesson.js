const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const dataItemSchema = new Schema({
    type: {
        type: String,
        required: true,
    },
    content: {
        type: Schema.Types.Mixed, 
        required: true
    }
});

const lessonSchema = {
    stepTitle: {
        type: String,
        required: true
    },
    from: {
        type: String,
        required: true
    },
    to: {
        type: String,
        required: true
    },
    data: {
        type: [dataItemSchema],
        required: true
    },
   
}

module.exports = mongoose.model('Lesson', lessonSchema);



