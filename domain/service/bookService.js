const Book = require('../model/book');
const Host = require('../model/host')
const User = require('../model/user')
const validate = require('../../config/validate')

checkInf =(list,itemRoom,key)=>{
    for ( let i of list){
        if(i._id==itemRoom.idUser) return i[key]
    }
}

const bookService = {
    saveNewBook: async (check) => {
        try {
            const { idRoom, idUser, idHost, time, priceSum,people, status } = check;
            if (validate.validateString(idRoom, idHost, idUser, time.start, time.end) &&
                validate.validateNumber(priceSum)) {
                console.log("check 2")
                const newBook = await new Book({
                    ...check, dateUp: Date.now()
                })
                const result = await newBook.save()
                return newBook
            }
        } catch (error) {
            throw Error
        }
    },

    getBookByIdHost: async (idHost) => {
        try{
        const listBook = await Book.find({ idHost: idHost })
        const host = await Host.findById(idHost).select({"hash":0,"salt":0,"stayListId":0})
        const listUserId = listBook.map(item => item.idUser)
        const listUser = await User.find({ _id: { $in: listUserId } })
        const result = listBook.map((item,index) =>({
            idRoom: item.idRoom,
            idUser: item.idUser,
            idHost :item.idHost,
            time: item.time,
            priceSum: item.priceSum,
            status:item.status,
            dateUp:item.dateUp,
            user:{
                email:checkInf(listUser,item,"email"),
                phone:checkInf(listUser,item,"phone"),
                name:checkInf(listUser,item,"name"),
                avatar:checkInf(listUser,item,"avatar")
            },
            host: host
        }))
        return result
        }catch(error){
            throw error
        }
    },

    getBookByIdUser: async (idUser) => {
        try{
        const listBook = await Book.find({ idUser: idUser })
        const user = await User.findById(idUser).select({"hash":0,"salt":0,"stayListId":0})
        const listHostId = listBook.map(item => item.idHost)
        const listHost = await Host.find({ _id: { $in: listHostId } })
        const result = listBook.map((item,index) =>({
            idRoom: item.idRoom,
            idUser: item.idUser,
            idHost :item.idHost,
            time: item.time,
            priceSum: item.priceSum,
            status:item.status,
            dateUp:item.dateUp,
            host:{
                email:checkInf(listHost,item,"email"),
                phone:checkInf(listHost,item,"phone"),
                name:checkInf(listHost,item,"name"),
                avatar:checkInf(listHost,item,"avatar")
            },
            user:user
        }))
        return result
        }catch(error){
            throw error
        }
    },

    getBookIdRoom: async (idRoom)=>{
        try{
            const books = await Book.find({idRoom:idRoom})
            const events = books.filter(item=>{
                return Date.parse(item.time.end)>=Date.now
            })

            const eventsDone = events.map(item=>({
                start:Date.parse(item.time.start)<Date.now()?new Date(Date.now()):item.time.start,
                end: item.time.end
            }))

            return  eventsDone
        }catch(error){
            throw error
        }
    },

    changeStatus :async (idBook,key)=>{
        const book = await Book.updateOne({"_id":idBook},status.key=true)
    }
   
}

module.exports = bookService