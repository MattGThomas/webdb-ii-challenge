const express = require('express')
const db = require('../data/dbConfig.js')
const router = express.Router()

router.get('/', (req, res) => {
    db('inventory')
        .then(inventory => {
            res.json(inventory)
        })
        .catch(err => {
            res.status(500).json({ 
                message: 'failed to retrieve the dealers inventory'
            })
        })
})

router.get('/:id', (req, res) => {
    const { id } = req.params
    db('inventory').where({ id })
        .then(vehicle => {
            if(vehicle) {
                res.json(vehicle)
            } else {
                res.status(404).json({
                    message: 'invalid vehicle id'
                })
            }
        })
        .catch(err => {
            res.status(500).json({
                message: 'There was an error retrieving the vehicle information'
            })
        })
})

router.post('/', checkNewVehicle, (req, res) => {
    const vehicleData = req.body
    db('inventory').insert(vehicleData)
        .then(cars => {
            res.status(201).json({ newVehicle: cars[0] })
        })
        .catch(err => {
            res.status(500).json({
                message: 'There was an error adding the vehicle'
            })
        })
})

router.put('/:id', (req, res) => {
    const { id } = req.params
    const changes = req.body

    db('inventory').where({ id }).update(changes)
        .then(count => {
            if(count) {
                res.json({ updated: count })
            } else {
                res.status(404).json({
                    message: 'invalid vehicle id'
                })
            }
        })
        .catch(err => {
            res.status(500).json({
                message: 'there was an error updating the vehicles information'
            })
        })
})

router.delete('/:id', (req, res) => {
    const { id } = req.params
    db('inventory').where({ id }).del()
        .then(count => {
            if(count) {
                res.json({ deleted: count })
            } else {
                res.status(404).json({
                    message: 'invalid vehicles id'
                })
            }
        })
        .catch(err => {
            res.status(500).json({
                message: 'there was an error deleting the vehicle information'
            })
        })
})

function checkNewVehicle(req, res, next) {
    if(!req.body.VIN) {
        res.status(404).json({
            message: 'The VIN is required'
        })
    } else if(!req.body.make) {
        res.status(404).json({
            message: 'The vehicles make is required'
        })
    } else if(!req.body.model) {
        res.status(404).json({
            message: 'The vehicles model is required'
        })
    } else if(!req.body.mileage) {
        res.status(404).json({
            message: 'The vehicles mileage is required'
        })
    } else {
        next()
    }
}
module.exports = router