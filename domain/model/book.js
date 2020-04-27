const mongoose = require('../../infastruture/database')
const {Schema} = require('mongoose')

const bookSchema = new Schema({
    idRoom: String,
    idUser: String,
    idHost :String,
    time: {
        start:String,
        end:String
    },
    priceSum: Number,
    status:{
        doneAccept:Boolean,
        donePay: Boolean,
        doneCancel:Boolean
    },
    dateUp:Date,
})

const Book = mongoose.model("Book",bookSchema)

module.exports = Book