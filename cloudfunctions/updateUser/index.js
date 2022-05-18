// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()
const db = cloud.database();
const _ = db.command
// 云函数入口函数
exports.main = async (event, context) => {
    const wxContext = cloud.getWXContext()
    var addallday = event.allday;
    var date = event.date;
    let { OPENID, APPID, UNIONID } = cloud.getWXContext()
         await db.collection("user").where({
            openid:OPENID
        }).update({
            data:{
                allday:_.inc(addallday),
                date : date
            }
        })
    return await db.collection("user").where({
        openid:OPENID
    }).field({
        allday:true,
        date:true
    }).get()
}