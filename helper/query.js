
exports.getTokenFromReq = req => req.body.token || req.query.token || req.headers['x-access-token']