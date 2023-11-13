const model = require('../models/index');


async function getAlgorithms(req, res) {
    try {
        const result = await model.allAlgorithms(req.params, req.query)
        res.status(200)
        res.send(result)

    } catch (error) {
        res.status(500)
        res.send(error)
    }
}

async function getSubsets(req, res) {
    try {
        const result = await model.allSubsets(req.query)
        res.status(200)
        res.send(result)

    } catch (error) {
        res.status(500)
        res.send(error)
    }
}

async function getAlgo(req, res) {
    try {
        const result = await model.oneAlgo(req.params)
        res.status(200)
        res.send(result)

    } catch (error) {
        res.status(500)
        res.send(error)
    }
}

async function removeAlgo(req, res) {
    try {
        const result = await model.deleteAlgo(req.query)
        res.status(200)
        res.send(result)

    } catch (error) {
        res.status(500)
        res.send(error)
    }
}



async function getCategories(req, res) {
    try {
        const result = await model.getCategoryList()
        res.status(200)
        res.send(result)
        
    } catch (error) {
        res.status(500)
        res.send(error)
    }
}


async function addAlgorithm(req, res) {
    try {
        const result = await model.createAlgorithm(req.body)
        res.status(200)
        res.send(result)
    } catch (error) {
        res.status(500)
        res.send(error)
    }
}





module.exports = { removeAlgo, getSubsets, getAlgorithms, getAlgo, getCategories, addAlgorithm }