'use strict'
const merge = require('webpack-merge')
const prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  // BASE_API: '"https://easy-mock.com/mock/5950a2419adc231f356a6636/vue-admin"',
  //BASE_API: '"http://10.59.9.83:8000"'
  // BASE_API: '"http://10.59.5.214:8000"'
  // BASE_API: '"http://10.51.15.215:8000"'

})
