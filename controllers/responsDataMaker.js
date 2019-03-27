module.exports = (data = {}, status, msg) => {
  if (data) {
    return {
      data,
      msg: 'success',
      status: 0
    }
  }

  return {
    data,
    status,
    msg
  }
}
