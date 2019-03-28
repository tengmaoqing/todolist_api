module.exports = (data = {}, status, msg, errors) => {
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
    msg,
    errors
  }
}
