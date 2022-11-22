const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const artSchema = new Schema ({
    userID: {
        type: String,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    artist: {
        type: String,
        required: true
    },
    source: {
        type: String,
        required: true
    },
    imageLink: {
        type: String,
        required: true
    },
    pieceIndex: {
        type: Number
    },
    dominantColor: {
        type: [Number]
    }
}, { timestamps: true });

module.exports = mongoose.model('Art', artSchema);