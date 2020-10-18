// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()
const db = cloud.database()

// 云函数入口函数
exports.main = async(event, context) => {
  /**
   * 根据 id 获取具体的信息
   */
  result =  await db.collection('collect').where({
    openid,
    id:id
  }).remove()
  return result
}