const express = require('express');
const { getAllArt, addArt, deleteArt } = require('../controllers/artController');
const router = express.Router();
const requireAuth = require('../middleware/requireAuth');

router.use(requireAuth);

router.get('/', getAllArt);

router.post('/', addArt);

router.delete('/:id', deleteArt);

module.exports = router;