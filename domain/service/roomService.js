const Room = require('../model/room')
const validate = require('../../config/validate')
const hostService = require('./hostService')
const User = require('../model/user')
const getTime = require('../../config/getTime')
const sort = require('../../config/sort')



const roomService = {
    getRoom: async () => {
        const rooms = await Room.find({});
        return rooms
    },

    getOneRoom: async (id) => {
        const room = await Room.findById(id)
        return room
    },

    getRoomHost: async (idHost) => {
        const rooms = await Room.find({ idHost })
        return rooms
    },

    // getRoomKey :async (key,value)=>{
    //     console.log(value>0)
    //     const check = value>0?Number(value):value
    //     console.log(check)
    //     console.log(key==='price')
    //     const rooms = await Room.find({[key]:check})
    //     console.log(rooms)
    //     return rooms
    // },


    saveNewRoom: async (infoRoom) => {
        try {
            console.log(infoRoom)
            const { idHost, name, key, city, district, detail, price,
                extraPrice, imageURL, present, specialNote, policy, guide, maxPeople, standarPeople,
                size, bedRooms, bathRooms, bedNumber, typeHouse, typeRoom, typeBed, ultilities, calendar } = infoRoom;
            if (imageURL.length < 5) {
                // console.log(imageURL.length)
                for (let i = 0; i < 5 - imageURL.length; i++) {
                    imageURL.push('/static/images/room/default.png');
                }
            }

            const newUltilities = ultilities.map(item => {
                return item.filter(itm => {
                    return itm.isChecked === true
                })
            })

            if (validate.validateString(name, city, district, detail, present, specialNote, policy, guide, typeHouse, typeRoom, typeBed) &&
                validate.validateNumber(price, extraPrice, maxPeople, standarPeople, size, bedRooms, bedNumber, bathRooms)) {
                const newRoom = await new Room({
                    ...infoRoom, ultilities: newUltilities
                })
                const results = await newRoom.save();

            } else throw new Error('Bạn phải nhập đủ các trường')
        } catch (error) {
            console.log(error)
            throw error;
        }
    },

    //search room
    search: async query => {
        const listSearch = ['text', 'startDate', 'endDate', 'people', 'price']
        const listCheckCity = []
        const listCheckDistrict = []
        try {
            if (!validate.validateQuery(query, listSearch)) throw new Error("404 not found");
            else if (query.length === 0) {
                return getRoom
            } else if (validate.validateQuery(query, listSearch)) {
                const { text, startDate, endDate, price, people } = query;
                var result =null;
                if (text!=='null' && text) {
                    if (listCheckCity.indexOf(text)) {
                         result = await Room.find({ city: text })
                    } else if (listCheckDistrict.indexOf(text)) {
                         result = await Room.find({ district: text })
                    } else {
                         result = await Room.find({ name: new RegExp(text, 'i') })
                    }
                }else{
                    result = await Room.find({})
                } 
            
                    if (startDate && endDate) {
                        result.filter(item => {

                        })
                        if (price!=='null' && price) {
                            result = result.filter(item => {
                                return (item.price > price - 400000 && item.price < price + 400000)
                            })
                        }
                        if (people!=='null' && people) {
                            result = result.filter(item => {
                                return item.people < people
                            })
                        }
                    }
                }
                return result
            }
         catch (error) {
            throw error
        }
    },



    //comment
    postComment: async (idRoom, idUser, rate, content, date) => {
        try {
            if (validate.validateString(content) && content) {
                const user = await User.findById(idUser)
                const room = await Room.findById(idRoom)
                let lengthRate = room.comments.length
                let rateSum = 0;
                for (let i = 0; i < lengthRate; i++) {
                    if (room.comments[i].rate) {
                        rateSum += room.comments[i].rate
                    }
                }
                const result = await Room.updateOne({ "_id": idRoom }, {
                    $push: {
                        comments: { idUser, nameUser: user.name, avatarUser: user.avatar, content, rate, date }
                    },
                    rate: (rateSum * lengthRate + rate) / (lengthRate + 1)
                })
                // const rateAve = await postRate(idRoom)
                return;
            } else {
                throw new Error('cmt have no content')
            }
        } catch (error) {
            throw error
        }
        // cmt xong thì tính lại rate chung của phòng
    },

    getComment: async (idRoom) => {
        try {
            const room = await Room.findById(idRoom)
            const commentList = room.toObject().comments;
            const newList = commentList.map((item) => ({
                idUser: item.idUser,
                userName: item.nameUser,
                avaUser: item.avatarUser,
                rate: item.rate,
                content: item.content,
                subTime: getTime(item.date),
                date: item.date
            }))
            return sort.sortCmtRate(newList)
        } catch (error) {
            throw error
        }
    },

    //Rate
    // postRate: async (idRoom) => {
    //     try {
    //         const rooms = await getOneRoom(idRoom)
    //         const ListComment = rooms.toObject().comments
    //         let rating = 0
    //         for (let i = 0; i < ListComment.length; i++) {
    //             if(ListComment[i].rate){
    //             rating += ListComment[i].rate
    //             }
    //         }
    //         const ratingAve = rating / ListComment.length
    //         const result = await Room.updateOne({ "_id": idRoom }, {
    //             rate: ratingAve > 3.5 ? Math.ceil(ratingAve) : Math.floor(ratingAve)
    //         })
    //         return;
    //     } catch (error) {
    //         throw error
    //     }
    // },


    getRate: async (idRoom) => {
        const rate = await Room.findById(idRoom);
        return rate.toObject().rate
    }
}

var getOneRoom = roomService.getOneRoom.bind(getOneRoom)
var getRoom = roomService.getRoom.bind(getRoom)


module.exports = roomService