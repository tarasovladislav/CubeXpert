const mongoose = require('mongoose');

const Algorithm = require('./algorithm')
const Lesson = require('./lesson')
// mongoose.connect('mongodb://127.0.0.1:27017/cubium').then(() => {
//     console.log('Connected to DB')
// }).catch((err) => console.log(err))

mongoose.connect(process.env.MONGODB_URI).then(() => {
    console.log('Connected to DB')
}).catch((err) => console.log(err))


async function allAlgorithms(params, query) {
    if (query.subset && query.category) return await Algorithm.find({ subset: query.subset, category: query.category }).sort({ _id: 'asc' })
    if (query.category) return await Algorithm.find({ category: query.category }).sort({ _id: 'asc' })
    return await Algorithm.find().sort({ _id: 'asc' })
}

async function allSubsets(query) {
    const result = await Algorithm.aggregate([
        { $match: { category: query.category } },
        {
            $group: {
                _id: '$subset',
                firstAdded: { $min: '$_id' }
            }
        },
        { $sort: { firstAdded: 1 } },
        {
            $group: {
                _id: null,
                subsets: { $push: '$_id' }
            }
        }
    ]);
    return result.length > 0 ? result[0].subsets : []

}

async function oneAlgo(params) {
    return await Algorithm.findOne({ _id: params._id })
}

async function createAlgorithm(body) {
    return await Algorithm.insertMany(body);
}









async function allLessons() {
    return await Lesson.find().sort({ _id: 'asc' })
}

async function createLesson(body) {
    return await Lesson.insertMany(body);
}







async function deleteAlgo(query) {
    return await Algorithm.deleteOne({ _id: query.id })
}

async function getCategoryList() {
    return await Algorithm.distinct('category')
}

async function modifyAlgo(params, body) {
    await Algorithm.findOneAndUpdate({ picturePath: params.picturePath }, body)
    return await Algorithm.find({ picturePath: params.picturePath })
}



module.exports = { deleteAlgo, modifyAlgo, allSubsets, allAlgorithms, oneAlgo, createAlgorithm, getCategoryList, allLessons, createLesson }
