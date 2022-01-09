const { ErrorRequestHandler } = require('express')

const errorHandler = (err, req, res, next) => {
  res.status(err.status || 500)
  res.json({
    status: err.message || 500
  })
}

module.exports = errorHandler