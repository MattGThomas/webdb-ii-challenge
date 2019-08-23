const express = require('express')
const inventoryRouter = require('../inventory/inventoryRouter.js')
const server = express()

server.use(express.json())
server.use('/api/inventory', inventoryRouter)

module.exports = server