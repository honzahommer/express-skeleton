const pkg = require('./package')

const ENV = process.env
const APP_DEPLOY_USER = ENV.APP_DEPLOY_USER || ENV.USERNAME
const APP_DEPLOY_REPO = ENV.APP_DEPLOY_REPO || pkg.repository.url
const APP_DEPLOY_REF  = ENV.APP_DEPLOY_REF  || 'origin/master'
const APP_DEPLOY_HOST = ENV.APP_DEPLOY_HOST || 'localhost'
const APP_DEPLOY_CMND = ENV.APP_DEPLOY_CMND || 'npm install && pm2 reload ecosystem.config.js'

module.exports = {
  apps: [
    {
    name: pkg.name,
    script: pkg.start,
      env: {
        NODE_ENV: 'dev'
      },
      env_production: {
        NODE_ENV: 'production'
      }
    }
  ],
  deploy: {
    production : {
      user: APP_DEPLOY_USER,
      host: APP_DEPLOY_HOST,
      ref:  APP_DEPLOY_REF,
      repo: APP_DEPLOY_REPO,
      path: '/var/app/production',
      'post-deploy': APP_DEPLOY_CMND + ' --env production'
    },
    dev: {
      user: APP_DEPLOY_USER,
      host: APP_DEPLOY_HOST,
      ref:  APP_DEPLOY_REF,
      repo: APP_DEPLOY_REPO,
      path: '/var/app/dev',
      'post-deploy' : APP_DEPLOY_CMND + ' --env dev'
    }
  }
}
