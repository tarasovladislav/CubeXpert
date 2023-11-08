async function getAlgo(picturePath) {
    try {
        const response = await fetch(`http://localhost:3100/algo/${picturePath}`);
        return await response.json()
    } catch (error) {
        console.log(error)
    }
}
async function getSubsetAlgorithms(cat, subset) {
    try {
        const response = await fetch(`http://localhost:3100/algorithms/?category=${cat}&subset=${subset}`);
        return await response.json()
    } catch (error) {
        console.log(error)
    }
}

module.exports = { getAlgo, getSubsetAlgorithms }