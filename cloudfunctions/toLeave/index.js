// 云函数入口文件
const cloud = require('wx-server-sdk')
cloud.init()

// 云函数入口函数

const db = cloud.database()
const _ = db.command

exports.main = async (event, context) => {
    var row = event.row;
    var column = event.column;
    var place = event.place;
    try {
        
    return await db.collection('self-study').where({
        row:row,
        column:column,
        place:place
    }).remove() 
  } catch(e) {
    console.error(e)
  }
}
