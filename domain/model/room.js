const mongoose = require('../../infastruture/database')
const { Schema } = require('mongoose')

const commentSchema = new Schema({
    idUser: String,
    nameUser:String,
    avatarUser:String,
    rate: Number,
    content: String,
    date: Date,
})

const ultilitiesSchema = new Schema({
    id: Number,
    value: String,
    name: String,
    isChecked: Boolean,
})

const calendarSchema = new Schema({
    start: String,
    end: String
})

const roomSchema = new Schema({
    idHost: String,
    name: String,
    key: Number,

    //address
    city: String,
    district: String,
    detail: String,

    price: Number,
    extraPrice: Number,
    imageURL: [String],
    present: String, // giới thiệu
    specialNote: String,
    guide: String,
    policy:String,
    maxPeople: Number,
    standardPeople: Number,
    size: Number,
    bedRooms: Number,
    bathRooms: Number,
    bedNumber: Number,
    typeHouse: String,
    typeRoom: String,
    typeBed: String,
    ultilities: [[ultilitiesSchema]], //tien ích
    calendar: calendarSchema,
    rate: Number,
    comments: [commentSchema]
})

const Room = mongoose.model("Room", roomSchema)

module.exports = Room