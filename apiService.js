async function getAlgo(picturePath) {
    try {
        const response = await fetch(`https://cubium-fe4h.vercel.app/algo/${picturePath}`);
        return await response.json()
    } catch (error) {
        console.log(error)
    }
}
async function getSubsetAlgorithms(cat, subset) {
    try {
        const response = await fetch(`https://cubium-fe4h.vercel.app/algorithms/?category=${cat}&subset=${subset}`);
        return await response.json()
    } catch (error) {
        console.log(error)
    }
}

async function getSubsetList(cat) {
    try {
        const response = await fetch(`https://cubium-fe4h.vercel.app/subsets/?category=${cat}`)
        return await response.json()
    } catch (error) {
        console.log(error)
    }
}

module.exports = { getAlgo, getSubsetAlgorithms, getSubsetList }