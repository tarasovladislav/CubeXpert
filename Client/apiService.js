const { Alert } = require('react-native')

const BASE_URL = 'http://localhost:3100'
// const BASE_URL = 'https://cube-xpert.vercel.app'

async function getAllAlgs() {
	try {
		const response = await fetch(`${BASE_URL}/algorithms/`)
		return await response.json()
	} catch (error) {
		Alert.alert(error)
		console.log(error)
	}
}

async function getRandomAlg() {
	try {
		const response = await fetch(`${BASE_URL}/algorithms/random`)
		return await response.json()
	} catch (error) {
		// Alert.alert(error)
		console.log(error)
	}
}

async function getAllLessons() {
	try {
		const response = await fetch(`${BASE_URL}/lessons`)
		return await response.json()
	} catch (error) {
		Alert.alert(error)
		console.log(error)
	}
}

async function getAlgo(_id) {
	try {
		const response = await fetch(`${BASE_URL}/algo/${_id}`)
		return await response.json()
	} catch (error) {
		Alert.alert(error)
		console.log(error)
	}
}
async function getSubsetAlgorithms(cat, subset) {
	try {
		const response = await fetch(
			`${BASE_URL}/algorithms/?category=${cat}&subset=${subset}`
		)
		return await response.json()
	} catch (error) {
		Alert.alert(error)
		console.log(error)
	}
}

async function getSubsetList(cat) {
	try {
		const response = await fetch(`${BASE_URL}/subsets/?category=${cat}`)
		return await response.json()
	} catch (error) {
		Alert.alert(error)
		console.log(error)
	}
}

module.exports = {
	getAlgo,
	getSubsetAlgorithms,
	getSubsetList,
	getAllAlgs,
	getAllLessons,
	getRandomAlg,
}
