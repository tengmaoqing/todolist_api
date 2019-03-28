const resMaker = require('./responsDataMaker')
const User = require('../model/user')

exports.getUserById = (req, res, next) => {
  const { _id } = req.userInfo
  if (!_id) {
    return res.json(resMaker(null, '10000', '_id 为空'))
  }
  User.findOne({
    _id
  }).exec().then(doc => {
    console.log(doc)
    if (!doc) {
      return res.json(resMaker(null, '10000', '没有查询到结果'))
    }
    res.json(resMaker(doc))
  }).catch(err => {
    res.json(resMaker(null, '10000', '查询异常'))
  })
}

exports.userList = (req, res, next) => {
  res.json(resMaker())
}
