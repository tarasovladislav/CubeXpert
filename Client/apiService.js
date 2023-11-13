async function getAllAlgs() {
    try {
        const response = await fetch(`https://cube-xpert.vercel.app/algorithms/`);
        return await response.json()
    } catch (error) {
        console.log(error)
    }
}

async function getAllLessons() {
    try {
        const response = await fetch(`https://cube-xpert.vercel.app/lessons`);
        return await response.json()
    } catch (error) {
        console.log(error)
    }
}

async function getAlgo(_id) {
    try {
        const response = await fetch(`https://cube-xpert.vercel.app/algo/${_id}`);
        return await response.json()
    } catch (error) {
        console.log(error)
    }
}
async function getSubsetAlgorithms(cat, subset) {
    try {
        const response = await fetch(`https://cube-xpert.vercel.app/algorithms/?category=${cat}&subset=${subset}`);
        return await response.json()
    } catch (error) {
        console.log(error)
    }
}

async function getSubsetList(cat) {
    try {
        const response = await fetch(`https://cube-xpert.vercel.app/subsets/?category=${cat}`)
        return await response.json()
    } catch (error) {
        console.log(error)
    }
}







module.exports = { getAlgo, getSubsetAlgorithms, getSubsetList, getAllAlgs, getAllLessons }