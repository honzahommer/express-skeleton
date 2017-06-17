const extend = require('deep-extend')
const env = process.env.NODE_ENV || 'dev'
const pkg = require('../../package')

module.exports = extend({
  app: {
    name: 'Express Skeleton',
    port: process.env.PORT || 8080,
    env: env
  },
  database: {
    migrationStorageTableName: 'migrations'
  },
  morgan: {
    type: 'combined',
    opts: {}
  },
  session: {
    cookieName: 'session'
  }
}, require('./environments/' + env))
