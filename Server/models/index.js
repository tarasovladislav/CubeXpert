const mongoose = require("mongoose");
require("dotenv").config();
const Algorithm = require("./algorithm");
const Lesson = require("./lesson");
const User = require("./user");
mongoose
  .connect(process.env.MONGODB_CONNECT_URI)
  .then(() => {
    console.log("Connected to DB");
  })
  .catch((err) => console.log(err));

async function allAlgorithms(params, query) {
  if (query.subset && query.category)
    return await Algorithm.find({
      subset: query.subset,
      category: query.category,
    }).sort({ _id: "asc" });
  if (query.category)
    return await Algorithm.find({ category: query.category }).sort({
      _id: "asc",
    });
  return await Algorithm.find().sort({ _id: "asc" });
}

async function allSubsets(query) {
  const result = await Algorithm.aggregate([
    { $match: { category: query.category } },
    {
      $group: {
        _id: "$subset",
        firstAdded: { $min: "$_id" },
      },
    },
    { $sort: { firstAdded: 1 } },
    {
      $group: {
        _id: null,
        subsets: { $push: "$_id" },
      },
    },
  ]);
  return result.length > 0 ? result[0].subsets : [];
}

async function oneAlgo(params) {
  return await Algorithm.findOne({ _id: params._id });
}

async function randomAlgo() {
  const randomAlgorithm = await Algorithm.aggregate([
    { $match: { category: { $ne: "Beginners" } } }, // Filter where category is not "Beginners"
    { $sample: { size: 1 } }, // Get one random document
  ]);

  if (randomAlgorithm.length === 0) {
    console.log('No algorithms found in categories other than "Beginners".');
  } else {
    return randomAlgorithm[0];
  }
}

async function createAlgorithm(body) {
  return await Algorithm.insertMany(body);
}

async function allLessons() {
  return await Lesson.find().sort({ _id: "asc" });
}

async function createLesson(body) {
  return await Lesson.insertMany(body);
}

async function deleteAlgo(query) {
  return await Algorithm.deleteOne({ _id: query.id });
}

async function getCategoryList() {
  return await Algorithm.distinct("category");
}

async function modifyAlgo(params, body) {
  await Algorithm.findOneAndUpdate({ picturePath: params.picturePath }, body);
  return await Algorithm.find({ picturePath: params.picturePath });
}

async function addPush(body) {
  const existingUser = await User.findOne(body);
  if (existingUser) {
    console.log("User with the same expoPushToken already exists.");
    return existingUser;
  } else {
    return await User.insertMany(body);
  }
}

module.exports = {
  deleteAlgo,
  modifyAlgo,
  allSubsets,
  allAlgorithms,
  oneAlgo,
  createAlgorithm,
  getCategoryList,
  allLessons,
  createLesson,
  randomAlgo,
  addPush,
};
