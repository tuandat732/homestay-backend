
module.exports = validate = {
    validateString: (...list) => {
        const newList = list.map(item => {
            return (item || item.trim());
        })
        return newList.length === list.length ? true : false;
    },
    validateNumber: (...list) => {
        const newList = list.map(item => {
            return (item > 0 && Number(item) === item)
        })
        return newList.length === list.length ? true : false;
    },
    validateEmail: (email) => {
        var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(email).toLowerCase());
    },
    validatePass: (pass) => {
        console.log(pass)
        var re = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$/
        return re.test(String(pass))
    },
    
    //validate query
    validateQuery:(listQuery,listCheck)=>{
        let listReturn = {}
        if (listQuery.length>listCheck.length) return false;
        for (item in listQuery){
            if(listCheck.indexOf(item)===-1) return false;
        }
        return true
    }
}