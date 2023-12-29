import React, { useEffect, useState } from 'react'
import {
	View,
	TouchableOpacity,
	StyleSheet,
	ScrollView,
	SafeAreaView,
	Dimensions,
	Text,
} from 'react-native'
import { useSettingsContext } from '../Contexts/SettingsContext'
import TouchableButtonTooltip from '../Components/TouchableButtonTooltip'
const CubeConfigurator = () => {
	//"U...R...F...D...L...B..."

	// Initialize each face of the cube with 9 squares, all set to grey
	const { defaultSettings } = useSettingsContext()
	const {
		U: up,
		F: left,
		R: front,
		L: back,
		B: right,
		D: down,
	} = defaultSettings
	const initialCubeState = {
		front: [
			'grey',
			'grey',
			'grey',
			'grey',
			front,
			'grey',
			'grey',
			'grey',
			'grey',
		],
		back: [
			'grey',
			'grey',
			'grey',
			'grey',
			back,
			'grey',
			'grey',
			'grey',
			'grey',
		],
		up: [
			'grey',
			'grey',
			'grey',
			'grey',
			up,
			'grey',
			'grey',
			'grey',
			'grey',
		],
		down: [
			'grey',
			'grey',
			'grey',
			'grey',
			down,
			'grey',
			'grey',
			'grey',
			'grey',
		],
		left: [
			'grey',
			'grey',
			'grey',
			'grey',
			left,
			'grey',
			'grey',
			'grey',
			'grey',
		],
		right: [
			'grey',
			'grey',
			'grey',
			'grey',
			right,
			'grey',
			'grey',
			'grey',
			'grey',
		],
	}

	const [cubeState, setCubeState] = useState(initialCubeState)
	const [selectedColor, setSelectedColor] = useState('grey')

	const colors = [left, front, back, right, up, down]

	const handleSquarePress = (face, squareIndex) => {
		const newCubeState = { ...cubeState }
		const newFaceColors = [...newCubeState[face]]
		const colorCount = Object.values(newCubeState).reduce(
			(count, faceColors) => {
				return (
					count +
					faceColors.filter((color) => color === selectedColor).length
				)
			},
			0
		)

		if (colorCount < 9) {
			newFaceColors[squareIndex] = selectedColor
			newCubeState[face] = newFaceColors
			setCubeState(newCubeState)
		}
	}
	const ColorSelector = () => {
		return (
			<View style={styles.colorSelector}>
				{colors.map((color) => (
					<TouchableOpacity
						key={color}
						style={[styles.colorButton, { backgroundColor: color }]}
						onPress={() => handleColorSelect(color)}
					>
						<Text style={styles.colorButtonText}>
							{color !== 'grey' &&
								cubeState[color].filter((c) => c === color)
									.length}
						</Text>
					</TouchableOpacity>
				))}
			</View>
		)
	}
	// const [colorsUser, setColorsUser] = useState({})

	// useEffect(() => {
	//     const updateColorsUser = () => {
	//         const newColorsUser = {}
	//         colors.forEach((color) => {
	//             const count = cubeState[color].filter((c) => c === color).length
	//             newColorsUser[color] = count
	//         })
	//         setColorsUser(newColorsUser)
	//     }

	//     updateColorsUser()
	// }, [cubeState])

	const handleColorSelect = (color) => {
		setSelectedColor(color)
	}

	const handleResetColors = () => {
		setCubeState(initialCubeState)
	}
	const handleSolve = () => {
		// setCubeState(initialCubeState)
	}

	const CubeFace = ({ face }) => {
		return (
			<View style={styles.cubeFace}>
				{face &&
					cubeState[face].map((color, index) => (
						<TouchableOpacity
							key={`${face}-${index}`}
							style={[
								styles.cubeSquare,
								{ backgroundColor: color },
							]}
							onPress={() => handleSquarePress(face, index)}
						/>
					))}
			</View>
		)
	}

	return (
		<SafeAreaView style={styles.container}>
			{/* Color selection buttons */}

			{/* Cube layout */}
			<View></View>
			<View style={styles.cubeLayout}>
				<View style={{ flexDirection: 'row', gap: 5 }}>
					<CubeFace />
					<CubeFace face="up" />
				</View>
				<View style={styles.middleRow}>
					<CubeFace face="left" />
					<CubeFace face="front" />
					<CubeFace face="right" />
					<CubeFace face="back" />
				</View>
				<View style={{ flexDirection: 'row', gap: 5 }}>
					<CubeFace />
					<CubeFace face="down" />
				</View>
			</View>
			<View>
				<View style={styles.colorSelector}>
					{colors.map((color) => (
						<TouchableOpacity
							key={color}
							style={[
								color === selectedColor
									? styles.selectedColorButton
									: styles.colorButton,
								{ backgroundColor: color },
							]}
							onPress={() => handleColorSelect(color)}
						>
							{/* <Text style={styles.colorButtonText}>{colorsUser[color]}</Text> */}
						</TouchableOpacity>
					))}
				</View>
				<View style={styles.buttonContainer}>
					<TouchableButtonTooltip
						disabled={
							Object.values(cubeState).reduce(
								(count, faceColors) => {
									return (
										count +
										faceColors.filter(
											(color) => color === 'grey'
										).length
									)
								},
								0
							) === 48
						}
						onPress={handleResetColors}
						text={'Reset Colors'}
					/>
					<TouchableButtonTooltip
						disabled={
							Object.values(cubeState).reduce(
								(count, faceColors) => {
									return (
										count +
										faceColors.filter(
											(color) => color === 'grey'
										).length
									)
								},
								0
							) > 0
						}
						onPress={handleSolve}
						text={'Solve The Cube'}
					/>
				</View>
			</View>
		</SafeAreaView>
	)
}
const width = Dimensions.get('window').width

const styles = StyleSheet.create({
	scrollViewContent: {
		flexGrow: 1,
		justifyContent: 'center',
	},
	container: {
		flex: 1,
		margin: 5,
		justifyContent: 'space-between',
	},
	colorSelector: {
		flexDirection: 'row',
		justifyContent: 'space-around',
		margin: 5,
		marginBottom: 20,
		backgroundColor: 'lightgrey',
		padding: 5,
		borderRadius: 5,
	},
	colorButton: {
		width: 50,
		height: 50,
		borderRadius: 5,
		margin: 5,
		borderColor: 'grey',
		borderWidth: 1,
	},
	selectedColorButton: {
		width: 50,
		height: 50,
		borderRadius: 5,
		margin: 5,
		borderColor: 'grey',
		transform: [{ scale: 1.15 }],
		borderWidth: 1,
	},
	cubeLayout: {
		gap: 5,
		// flexDirection: 'column',
		// alignItems: 'center',
		// justifyContent: 'center',
	},
	middleRow: {
		flexDirection: 'row',
		// alignItems: 'center',
		// justifyContent: 'center',
		gap: 5,
	},
	cubeFace: {
		flexDirection: 'row',
		flexWrap: 'wrap',
		width: (width - 25) / 4, // Adjust the width according to the size of the squares and margins
		justifyContent: 'center',
		gap: 1,
	},
	cubeSquare: {
		width: (width - 25) / 4 / 3 - 1,
		height: (width - 25) / 4 / 3 - 1,
		// margin: 1,
		borderRadius: 5,
		borderColor: '#2c2c2c',
		borderWidth: 1,
	},
	buttonContainer: {
		flexDirection: 'row',
		position: 'relative',
	},
})

export default CubeConfigurator
