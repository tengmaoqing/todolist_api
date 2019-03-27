const jwt = require('jsonwebtoken')
const User = require('../model/user')
const resMaker = require('./responsDataMaker')
const config = require('../config')

exports.login = async (req, res) => {
  const user = await User.findOne({
    name: req.body.name
  }).exec()
  if (!user) {
    res.json(resMaker(null, -1, '未找到用户'))
    return
  }
  if (user.password !== req.body.password) {
    return res.json(resMaker(null, '-1', '密码错误'))
  }

  const token = jwt.sign(user, config.superSecret, {
    expiresIn : 60*60*24// 授权时效24小时
  });

  res.json({
    token
  })
}

const getUserInfo = req => {
  const token = req.body.token || req.query.token || req.headers['x-access-token'];
  return new Promise((resolve, reject) => {
    if (!token) {
      resolve()
      return false
    }
    
    jwt.verify(token, config.superSecret, (err, decoded) => {
      if (err) {
        reject(err)
        return false
      }
    
      resolve(decoded)
      // next();
    })
  })
}

exports.injectUser = (req, res, next) => {
  getUserInfo(req).then(user => {
    if (user) {
      req.decoded = user
    }
  }).finally(() => {
    next()
  })
}

exports.authUser = (req, res, next) => {
  getUserInfo(req).then(user => {
    if (!user) {
      res.json(null, '40001', '没有token')
      return
    }
    next()
  }).catch(err => {
    res.json(null, '40001', '无效的token')
  })
}
