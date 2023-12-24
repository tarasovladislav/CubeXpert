const { Alert } = require('react-native')
import { BASE_URL } from './env'
async function getAllAlgs() {
	try {
		const response = await fetch(`${BASE_URL}/algorithms/`)
		return await response.json()
	} catch (error) {
		console.log(error)
	}
}

async function getRandomAlg() {
	try {
		const response = await fetch(`${BASE_URL}/algorithms/random`)
		return await response.json()
	} catch (error) {
		Alert.alert(
			'Error',
			'An error occurred while fetching data. Please try again later.'
		)
	}
}

async function getAllLessons() {
	try {
		const response = await fetch(`${BASE_URL}/lessons`)
		return await response.json()
	} catch (error) {
		console.log(error)
	}
}

async function getAlgo(_id) {
	try {
		const response = await fetch(`${BASE_URL}/algo/${_id}`)
		return await response.json()
	} catch (error) {
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
		console.log(error)
	}
}

async function getSubsetList(cat) {
	try {
		const response = await fetch(`${BASE_URL}/subsets/?category=${cat}`)
		return await response.json()
	} catch (error) {
		console.log(error)
	}
}

async function registerForPushNotifications(expoPushToken) {
    try {
        const response = await fetch(`${BASE_URL}/push-token`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ expoPushToken }),
        })
        return await response.json()
    } catch (error) {
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
    registerForPushNotifications
}
