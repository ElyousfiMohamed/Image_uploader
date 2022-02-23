const route = require('express').Router()
const controller = require('../controller')
route.get('/',controller.home)

module.exports = route;