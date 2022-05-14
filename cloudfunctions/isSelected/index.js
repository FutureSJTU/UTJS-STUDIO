// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()
const db=cloud.database();

// 云函数入口函数
exports.main = async (event, context) => {
    var row = event.row;
    var column = event.column;
    var place = event.place;

    var ret = db.collection("self-study").where({
        row:row,
        column:column,
        place:place
    }).count()

    return ret
}