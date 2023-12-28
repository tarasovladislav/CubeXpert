import React, { createContext, useContext, useEffect, useState } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'

const RotateTheCubeContext = createContext()

const RotateTheCubeContextProvider = ({ children }) => {
	const rotateCube = {
		cubeSize: 3,
		lastCubeFacelets: '',
		savedCubeSize: 3,
	}

	const changeCubeSize = (newCubeSize) => {
		setRotateTheCube({ ...rotateTheCube, cubeSize: newCubeSize })
	}

	const changeLastCubeFacelets = (newLastCubeFacelets,size) => {
		setRotateTheCube({
			...rotateTheCube,
			lastCubeFacelets: newLastCubeFacelets,
			savedCubeSize: size,
		})
	}
	const [rotateTheCube, setRotateTheCube] = useState({ ...rotateCube })

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
