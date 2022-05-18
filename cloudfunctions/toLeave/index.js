// 云函数入口文件
const cloud = require('wx-server-sdk')
cloud.init()

// 云函数入口函数

const db = cloud.database()
const _ = db.command

exports.main = async (event, context) => {
    var num = event.num;
    var place = event.place;
    try {
        
    return await db.collection('self-study').where({
        num:num,
        place:place
    }).remove() 
  } catch(e) {
    console.error(e)
  }
}
