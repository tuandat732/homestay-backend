// module.exports = sortCmtRate = (listCmt) => {
//     let listNewCmt = sortTime(listCmt);
//     return listNewCmt.sort((a,b)=>{
//         // if(b.rate && a.rate)
//         return b.rate-a.rate;
//     })
// }

// sortTime =(listCmt)=>{
//     return listCmt.sort((a,b)=>{
//         let d1 = Date.parse(a.date);
//         let d2 = Date.parse(b.date);
//         return d2-d1;
//     })
// }

module.exports = sort ={
    sortCmtRate : (listCmt) => {
        let listNewCmt = sortTime(listCmt);
        return listNewCmt.sort((a,b)=>{
            // if(b.rate && a.rate)
            return b.rate-a.rate;
        })
    },
    sortTime :(listCmt)=>{
        return listCmt.sort((a,b)=>{
            let d1 = Date.parse(a.date);
            let d2 = Date.parse(b.date);
            return d2-d1;
        })
    }
}

var sortTime = sort.sortTime.bind(sortTime)
