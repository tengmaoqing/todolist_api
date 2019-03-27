const resMaker = require('./responsDataMaker')
const User = require('../model/user')

exports.addUser = (req, res, next) => {
  const user = new User({
    email: req.body.email,
    password: req.body.password
  })
  user.save().then(() => {
    res.json(resMaker())
  }).catch(err => {
    res.json(resMaker(null, '10000', '系统异常'))
  })
}

exports.getUserById = (req, res, next) => {
  const userId = req.query.userId
  if (!userId) {
    return res.json(resMaker(null, '10000', 'userId 为空'))
  }
  User.findOne({
    _id: userId
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
