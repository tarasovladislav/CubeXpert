const model = require("../models/index");
const solver = require("rubiks-cube-solver");
const Cube = require("cubejs");
Cube.initSolver();

async function cubeSolver(req, res) {
  try {
    let facelets = req.params.facelets;
    let faceletsCopy = req.params.facelets;
    let faceletsArray = [];
    for (let i = 0; i < faceletsCopy.length; i += 9) {
      faceletsArray.push(
        faceletsCopy
          .slice(i, i + 9)
          .split("")
          .reverse()
          .join("")
          .replace(/U/g, "temp") // Temporarily replace U with 'temp'
          .replace(/D/g, "U")
          .replace(/temp/g, "D")
          .replace(/L/g, "temp") // Temporarily replace L with 'temp'
          .replace(/R/g, "L")
          .replace(/temp/g, "R")
      );
    }
    let testFacelets =
      faceletsArray[2] + // corect
      faceletsArray[4] + // corect
      faceletsArray[3] + // corect
      faceletsArray[0] + // corect
      faceletsArray[1] + // corect
      faceletsArray[5]; // corect

    await solver(testFacelets); // Wait for solver() to complete

    let cube = Cube.fromString(facelets);

    let result;

    try {
      result = cube.solve([5]);
    } catch (error) {
      result = cube.solve();
    }

    res.send(JSON.stringify(result));
    res.status(200);
  } catch (error) {
    res.status(500);
    res.send(JSON.stringify("The Cube is unsolvable."));
  }
}

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

async function addPushToken(req, res) {
  try {
    const result = await model.addPush(req.body);
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
  addPushToken,
  cubeSolver,
};
