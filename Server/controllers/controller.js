const model = require("../models/index");

async function getAlgorithms(req, res) {
  try {
    const result = await model.allAlgorithms(req.params, req.query);
    res.status(200);
    res.send(result);
  } catch (error) {
    res.status(500);
    res.send(error);
  }
}

async function getRandomAlgo(req, res) {
  try {
    const result = await model.randomAlgo();
    res.status(200);
    res.send(result);
  } catch (error) {
    res.status(500);
    res.send(error);
  }
}

async function getLessons(req, res) {
  try {
    const result = await model.allLessons();
    res.status(200);
    res.send(result);
  } catch (error) {
    res.status(500);
    res.send(error);
  }
}

async function getSubsets(req, res) {
  try {
    const result = await model.allSubsets(req.query);
    res.status(200);
    res.send(result);
  } catch (error) {
    res.status(500);
    res.send(error);
  }
}

async function getAlgo(req, res) {
    try {
      const result = await model.oneAlgo(req.params);
      res.status(200).send(result);
    } catch (error) {
      console.error("Error in getAlgo:", error);
      res.status(500).send({ error: "Internal Server Error" });
    }
  }

async function removeAlgo(req, res) {
  try {
    const result = await model.deleteAlgo(req.query);
    res.status(200);
    res.send(result);
  } catch (error) {
    res.status(500);
    res.send(error);
  }
}

async function getCategories(req, res) {
  try {
    const result = await model.getCategoryList();
    res.status(200);
    res.send(result);
  } catch (error) {
    res.status(500);
    res.send(error);
  }
}

async function addAlgorithm(req, res) {
  try {
    const result = await model.createAlgorithm(req.body);
    res.status(200);
    res.send(result);
  } catch (error) {
    res.status(500);
    res.send(error);
  }
}
async function addLesson(req, res) {
  try {
    const result = await model.createLesson(req.body);
    res.status(200);
    res.send(result);
  } catch (error) {
    res.status(500);
    res.send(error);
  }
}

function cubeAnimation(req, res) {
  res.sendFile(__dirname + "/public/index.html");
}

module.exports = {
  removeAlgo,
  getSubsets,
  getAlgorithms,
  getAlgo,
  getCategories,
  addAlgorithm,
  getLessons,
  addLesson,
  cubeAnimation,
  getRandomAlgo,
};
