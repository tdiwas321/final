const mongoose = require('mongoose')

const bookSchema = new mongoose.Schema({
    bookername:{
        type:String,
        required: [true,"Please provide your firstname"]
    },
    venuename:{
        type:String,
        required: [true,"Venue not selected"]
    },
    venuemail:{
        type:String,
        required: [true,"Venue email not available"]
    },
    bookermail:{
        type:String,
        required: [true,"User email not available"]
    },
    bookeddate:{
        type:String,
        required: [true,"Please select appropriate date"]
    },approved:{
        type:Boolean,
        default:false
    },bookerID:{
        type:String,
        required:[true,"Booker details not provided"]
    },venueID:{
        type:String,
        required:[true,"Venue details not provided"]
    }
})

const book = mongoose.model('book',bookSchema)
module.exports = book