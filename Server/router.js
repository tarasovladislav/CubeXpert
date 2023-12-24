const express = require("express");
const router = express.Router();
const controller = require("./controllers/controller");

router.get("/algorithms", controller.getAlgorithms);
router.get("/algo/:_id", controller.getAlgo);
router.get("/subsets/", controller.getSubsets);

router.post("/algorithms", controller.addAlgorithm);

router.get("/", controller.cubeAnimation);
router.get("/rotate", (req, res) => {
  res.sendFile(__dirname + "/public/rotate.html");
});

router.get("/algorithms/random", controller.getRandomAlgo);

router.get("/lessons/", controller.getLessons);
router.post("/lessons/", controller.addLesson);

router.get("/algorithms/categories", controller.getCategories);

router.post("/push-token", controller.addPushToken);

module.exports = router;
