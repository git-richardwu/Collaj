const mongoose = require('mongoose');

const Schema = mongoose.Schema

const artSchema = new Schema ({
    title: {
        type: String,
        required: true
    },
    artist: {
        type: String,
        requried: true
    },
    source: {
        type: String,
        requried: true
    }

}, { timestamps: true} )

module.exports = mongoose.model('Art', artSchema)

