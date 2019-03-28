const jwt = require('jsonwebtoken')
const { validationResult } = require('express-validator/check')
const User = require('../model/user')
const resMaker = require('./responsDataMaker')
const config = require('../config')
const { getTokenFromReq } = require('../helper/query')

exports.login = async (req, res) => {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    res.json(resMaker(null, '10000', '参数校验失败', errors.array()))
    return
  }

  const user = await User.findOne({
    email: req.body.email
  }).exec()
  if (!user) {
    res.json(resMaker(null, -1, '未找到用户'))
    return
  }
  if (user.password !== req.body.password) {
    return res.json(resMaker(null, '-1', '密码错误'))
  }
  
  console.log(JSON.stringify(user))
  jwt.sign(user.toJSON(), config.superSecret, {
    expiresIn : 60*60*24// 授权时效24小时
  }, (err, token) => {
    if (err) {
      res.json(resMaker(null, '10000', '生成签名异常'))
      return
    }
    res.json(resMaker({
      token
    }))

  })

}
 
exports.registry = (req, res) => {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    res.json(resMaker(null, '10000', '参数校验失败', errors.array()))
    return
  }
  const { email, password } = req.body
  const user = new User({
    email: email,
    password: password
  })
  user.save().then(() => {
    res.json(resMaker())
  }).catch(err => {
    res.json(resMaker(null, '10000', '系统异常'))
  })
}

const getUserInfo = token => {
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
  const token = getTokenFromReq(req)
  getUserInfo(token).then(user => {
    if (user) {
      req.userInfo = user
    }
  }).catch(err => {

  }).finally(() => {
    next()
  })
}

exports.authUser = (req, res, next) => {
  const token = getTokenFromReq(req)
  if (!token) {
    res.json(resMaker(null, '40001', '没有token'))
    return
  }  
  if (!req.userInfo) {
    res.json(resMaker(null, '40001', '无效的token'))
    return
  }
  next()
}
