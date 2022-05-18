// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()
const db=cloud.database();
// 云函数入口函数
exports.main = async (event, context) => {
    var pl=event.place;
    var res = db.collection("self-study").where({
        place: pl
    }).count()
    return res
}