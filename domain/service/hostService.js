const Host = require('../model/host')

const hostService = {
    saveIdRoom:async (idRoom,idHost) =>{
        try{
        const result = await Host.update(
            {"_id":idHost},
            {$push:{stayListId:idRoom}},done
        )
        }catch(error){
            throw new Error("cannot save id room to host list id")
        }
    }
}