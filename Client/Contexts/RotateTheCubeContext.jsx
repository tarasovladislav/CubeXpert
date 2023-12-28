import React, { createContext, useContext, useEffect, useState } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'

const RotateTheCubeContext = createContext()

const RotateTheCubeContextProvider = ({ children }) => {
	const rotateCube = {
		cubeSize: 3,
		lastCubeFacelets: "",
			// '[[2,4,5,0,0,5,5,2,4],[1,0,4,3,1,0,0,2,3],[5,5,2,1,2,4,1,4,3],[1,3,4,5,3,2,0,3,0],[1,3,2,1,4,1,4,4,2],[3,2,5,0,5,1,3,5,0]]',
		savedCubeSize: 3,
	}

	const changeCubeSize = (newCubeSize) => {
		setRotateTheCube({ ...rotateTheCube, cubeSize: newCubeSize })
	}

	const changeLastCubeFacelets = (newLastCubeFacelets, size) => {
		setRotateTheCube({
			...rotateTheCube,
			lastCubeFacelets: newLastCubeFacelets,
			savedCubeSize: size,
		})
	}
	const [rotateTheCube, setRotateTheCube] = useState({ ...rotateCube })
	const [cubeSaver, setCubeSaver] = useState(false)
	const [restoreCubeTrigger, setRestoreCubeTrigger] = useState(false)
	const [newCubeScramble, setNewCubeScramble] = useState(false)

	useEffect(() => {
		AsyncStorage.getItem('rotateTheCube')
			.then((data) => {
				data && setRotateTheCube(JSON.parse(data))
			})
			.catch((error) => {
				console.error('Error retrieving settings: ', error)
			})
	}, [])

	useEffect(() => {
		const rotateTheCubeJson = JSON.stringify(rotateTheCube)
		AsyncStorage.setItem('rotateTheCube', rotateTheCubeJson)
			.then(() => {})
			.catch((error) => {
				console.log(error)
			})
	}, [rotateTheCube])

	return (
		<RotateTheCubeContext.Provider
			value={{
				rotateTheCube,
				changeCubeSize,
				changeLastCubeFacelets,
				newCubeScramble,
				setNewCubeScramble,
				cubeSaver,
				setCubeSaver,
				restoreCubeTrigger,
				setRestoreCubeTrigger,
			}}
		>
			{children}
		</RotateTheCubeContext.Provider>
	)
}

const useRotateTheCubeContext = () => {
	return useContext(RotateTheCubeContext)
}

export { RotateTheCubeContextProvider, useRotateTheCubeContext }
