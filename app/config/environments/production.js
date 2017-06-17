const rfs = require('rotating-file-stream')

module.exports = {
  morgan: {
    opts: {
      stream: rfs('access.log', {
        interval: '1d',
        path: 'log'
      })
    }
  }
}
