// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()
const db = cloud.database();
const _ = db.command
// 云函数入口函数
exports.main = async (event, context) => {
    const wxContext = cloud.getWXContext()
    var addsdt = event.addsdt;
    var iname = event.iname;
    let { OPENID, APPID, UNIONID } = cloud.getWXContext()
         await db.collection("user").where({
            openid:OPENID
        }).update({
            data:{
                studytime:_.inc(addsdt),
                name :iname
            }
        })
    return await db.collection("user").where({
        openid:OPENID
    }).field({
        studytime:true,
        name:true
    }).get()
}