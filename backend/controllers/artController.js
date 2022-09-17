const Art = require('../models/artModels')
const mongoose = require('mongoose')

const getAllArt = async (req, res) => {
    try {
        const allArt = await Art.find({}).sort({createdAt: -1})
        res.status(200).json(allArt)
    }
    catch (error) {
            res.status(400).json({error: error.message})
    }
}
const getSpecificArt = async (req, res) => {
    const { id } = req.params
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error: 'ID is not valid.'})
    }
    try {
        const specificArt = await Art.findById(id)
        if (!specificArt) {
            return res.status(404).json({error: 'Art does not exist.'})
        }
        return res.status(200).json(specificArt)
    } catch (error) {
        res.status(400).json({error: error.message})
    }
}
const addArt = async (req, res) => {
    const {title, artist, source} = req.body

    try {
        const artwork = await Art.create({title, artist, source })
        res.status(200).json(artwork)
    } catch (error) {
        res.status(400).json({error: error.message})
    }
}
const deleteArt = async (req, res) => {
    const { id } = req.params
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error: 'ID is not valid.'})
    }
    try {
        const ArtofID = await Art.findByIdAndDelete(id)
        if (!ArtofID) {
            return res.status(404).json({error: 'Art does not exist.'})
        }
        return res.status(200).json(ArtofID)
    } catch (error) {
        res.status(400).json({error: error.message})
    }
}
const updateArt = async (req, res) => {
    const { id } = req.params
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error: 'ID is not valid.'})
    }
    try {
        const ArtToUpdate = await Art.findByIdAndUpdate(id, {
           ...req.body}, {new: true})
        if (!ArtToUpdate) {
            return res.status(404).json({error: 'Art does not exist.'})
        }
        return res.status(200).json(ArtToUpdate)
    } catch (error) {
        res.status(400).json({error: error.message})
    }
}

module.exports = {
    getAllArt,
    getSpecificArt,
    addArt,
    deleteArt,
    updateArt
}