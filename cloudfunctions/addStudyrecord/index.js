// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()
const db=cloud.database();


// 云函数入口函数
exports.main = async (event, context) => {
<<<<<<< HEAD
    var row=event.row;
    var column = event.column;
    var place = event.place;
    var iname = event.name;
    //在这里写函数,event接收前段来的数据
    var num;
    num = await db.collection("user").where({
=======
    var num=event.num;
    var place = event.place;
    var iname = event.name;
    //在这里写函数,event接收前段来的数据
    var inum;
    inum = await db.collection("user").where({
>>>>>>> origin/dev
        name:iname
    }).field({
        demoOrder:true
    }).limit(1).get()

    db.collection("self-study").add({
        data:{
<<<<<<< HEAD
            user_num:num.data[0].demoOrder,
            row:row,
            column:column,
=======
            user_num:inum.data[0].demoOrder,
            num:num,
>>>>>>> origin/dev
            place:place
        }
    })
    return await db.collection("self-study").get()
}