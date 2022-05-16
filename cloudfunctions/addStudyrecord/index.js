// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()
const db=cloud.database();


// 云函数入口函数
exports.main = async (event, context) => {
    var num=event.num;
    var place = event.place;
    var iname = event.name;
    //在这里写函数,event接收前段来的数据
    var inum;
    inum = await db.collection("user").where({
        name:iname
    }).field({
        demoOrder:true
    }).limit(1).get()

    db.collection("self-study").add({
        data:{
            user_num:inum.data[0].demoOrder,
            num:num,
            place:place
        }
    })
    return await db.collection("self-study").get()
}