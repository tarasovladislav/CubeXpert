const express = require('express')
const router = express.Router();
const controller = require('./controllers/controller')

router.get('/algorithms', controller.getAlgorithms)
router.get('/algo/:_id', controller.getAlgo)
router.get('/subsets/', controller.getSubsets)

router.post('/algorithms', controller.addAlgorithm)

router.get('/animation/', controller.cubeAnimation)




router.get('/lessons/', controller.getLessons)
router.post('/lessons/', controller.addLesson)

// router.get('/algorithms/:category', controller.getAlgorithms)
// router.get('/algorithms/', controller.getAlgorithmsSubset)
// router.get('/algorithms/categories', controller.getCategories)
// router.get('/algorithms/categories', controller.getCategories)

// router.delete('/algo/', controller.removeAlgo)


module.exports = router