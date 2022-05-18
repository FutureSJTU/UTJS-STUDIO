// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()
const db = cloud.database();
// 云函数入口函数
exports.main = async (event, context) => {
    let { OPENID, APPID, UNIONID } = cloud.getWXContext()
    var iname = event.iname;
    var gender = event.gender;
    var date = event.date;
    var allday = event.allday;
    db.collection("user").add({
        data:{
            name:iname,
            gender:gender,
            openid:OPENID,
            date:date,
            allday:allday,
            studytime:0
        }
    })

    return {
      OPENID,
      APPID,
      UNIONID,
    }
  }