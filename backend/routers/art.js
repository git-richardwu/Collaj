const express = require('express')
const { getAllArt, getSpecificArt, addArt, deleteArt, updateArt } = require('../controllers/artController')
const router = express.Router()

router.get('/', getAllArt)

router.get('/:id', getSpecificArt)

router.post('/', addArt)

router.delete('/:id', deleteArt)

router.patch('/:id', updateArt)

module.exports = router