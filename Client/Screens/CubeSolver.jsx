import React, { useEffect, useState, useRef } from 'react'
import {
	View,
	TouchableOpacity,
	StyleSheet,
	ScrollView,
	SafeAreaView,
	Dimensions,
	Text,
	Alert,
} from 'react-native'
import { useSettingsContext } from '../Contexts/SettingsContext'
import TouchableButtonTooltip from '../Components/TouchableButtonTooltip'
import apiService from '../apiService'
import NewCubeAnimation from '../Components/NewCubeAnimation'
const CubeConfigurator = ({ navigation }) => {
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
	}

	const [cubeState, setCubeState] = useState(initialCubeState)
	const [selectedColor, setSelectedColor] = useState('grey')

	const colors = [left, front, back, right, up, down, 'grey']

	// const [previewFacelets, setPreviewFacelets] = useState(
	// 	'qqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqq'
	// )
	let previewFacelets =
		'qqqq0qqqqqqqq1qqqqqqqq2qqqqqqqq3qqqqqqqq4qqqqqqqq5qqqq'
	const animationRef = useRef(null)

	const handlePreviewChange = (face, squareIndex) => {
		let faceIndex
		let sqrIndex
		let colorNumber

		switch (selectedColor) {
			case up:
				colorNumber = 0
				break
			case front:
				colorNumber = 5
				break
			case back:
				colorNumber = 4
				break
			case right:
				colorNumber = 3
				break
			case left:
				colorNumber = 2
				break
			case down:
				colorNumber = 1
				break
			default:
				colorNumber = 23
				break
		}

		switch (face) {
			case 'up':
				faceIndex = 0
				switch (squareIndex) {
					case 0:
						sqrIndex = 6
						break
					case 1:
						sqrIndex = 7
						break
					case 2:
						sqrIndex = 8
						break
					case 3:
						sqrIndex = 3
						break
					case 4:
						sqrIndex = 4
						break
					case 5:
						sqrIndex = 5
						break
					case 6:
						sqrIndex = 0
						break
					case 7:
						sqrIndex = 1
						break
					case 8:
						sqrIndex = 2
						break
				}

				break
			case 'front':
				faceIndex = 2
				switch (squareIndex) {
					case 0:
						sqrIndex = 0
						break
					case 1:
						sqrIndex = 3
						break
					case 2:
						sqrIndex = 6
						break
					case 3:
						sqrIndex = 1
						break
					case 4:
						sqrIndex = 4
						break
					case 5:
						sqrIndex = 7
						break
					case 6:
						sqrIndex = 2
						break
					case 7:
						sqrIndex = 5
						break
					case 8:
						sqrIndex = 8
						break
				}

				break
			case 'right':
				faceIndex = 5
				switch (squareIndex) {
					case 0:
						sqrIndex = 0
						break
					case 1:
						sqrIndex = 3
						break
					case 2:
						sqrIndex = 6
						break
					case 3:
						sqrIndex = 1
						break
					case 4:
						sqrIndex = 4
						break
					case 5:
						sqrIndex = 7
						break
					case 6:
						sqrIndex = 2
						break
					case 7:
						sqrIndex = 5
						break
					case 8:
						sqrIndex = 8
						break
				}

				break
			case 'left':
				faceIndex = 4
				switch (squareIndex) {
					case 0:
						sqrIndex = 2
						break
					case 1:
						sqrIndex = 1
						break
					case 2:
						sqrIndex = 0
						break
					case 3:
						sqrIndex = 5
						break
					case 4:
						sqrIndex = 4
						break
					case 5:
						sqrIndex = 3
						break
					case 6:
						sqrIndex = 8
						break
					case 7:
						sqrIndex = 7
						break
					case 8:
						sqrIndex = 6
						break
				}
				break
			case 'back':
				faceIndex = 3
				switch (squareIndex) {
					case 0:
						sqrIndex = 0
						break
					case 1:
						sqrIndex = 3
						break
					case 2:
						sqrIndex = 6
						break
					case 3:
						sqrIndex = 1
						break
					case 4:
						sqrIndex = 4
						break
					case 5:
						sqrIndex = 7
						break
					case 6:
						sqrIndex = 2
						break
					case 7:
						sqrIndex = 5
						break
					case 8:
						sqrIndex = 8
						break
				}

				break
			case 'down':
				faceIndex = 1
				switch (squareIndex) {
					case 0:
						sqrIndex = 0
						break
					case 1:
						sqrIndex = 3
						break
					case 2:
						sqrIndex = 6
						break
					case 3:
						sqrIndex = 1
						break
					case 4:
						sqrIndex = 4
						break
					case 5:
						sqrIndex = 7
						break
					case 6:
						sqrIndex = 2
						break
					case 7:
						sqrIndex = 5
						break
					case 8:
						sqrIndex = 8
						break
				}
				break
		}

		animationRef.current.injectJavaScript(
			`update_facelet(${faceIndex},${sqrIndex},${colorNumber});true`
		)
	}

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

		if (colorCount < 9 || selectedColor === 'grey') {
			handlePreviewChange(face, squareIndex)
			newFaceColors[squareIndex] = selectedColor
			newCubeState[face] = newFaceColors
			setCubeState(newCubeState)
		}
	}

	const handleColorSelect = (color) => {
		setSelectedColor(color)
	}

	const handleResetColors = () => {
		setAnimationKey(animationKey + 1)
		setCubeState(initialCubeState)
	}

	const translateColor = (color) => {
		switch (color) {
			case up:
				return 'U'
			case front:
				return 'F'
			case right:
				return 'R'
			case left:
				return 'L'
			case back:
				return 'B'
			case down:
				return 'D'
		}
	}

	const cubeStateTranslator = (state) => {
		return Object.values(state).reduce((cubeStateString, faceColors) => {
			return cubeStateString + faceColors.map(translateColor).join('')
		}, '')
	}

	const handleSolve = () => {
		const cubeStateString = cubeStateTranslator(cubeState)
		apiService.cubeSolver(cubeStateString).then((data) => {
			if (data === 'The Cube is unsolvable.') {
				Alert.alert(
					'The Cube is unsolvable',
					'Please check facelet colors and try again.'
				)
			} else {
				console.log(data)
				Alert.alert('Solution is ready!', 'Check it out!', [
					{
						text: "Let's go!",
						onPress: () =>
							navigation.navigate('CubeSolverSolution', {
								solution: data,
							}),
					},
					{
						text: 'Cancel',
						style: 'cancel',
					},
				])
			}
		})
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

	const [isPlaying, setIsPlaying] = useState(false)

	const [currentAlg, setCurrentAlg] = useState({ algo: ['U'] })

	const [animationKey, setAnimationKey] = useState(0)

	return (
		<SafeAreaView style={styles.container}>
			{/* Cube layout */}
			{/* Add the cube and in live change its facelets when we update any of the states.  */}

			<NewCubeAnimation
				cubeSize={3}
				key={animationKey}
				isPlaying={isPlaying}
				setIsPlaying={setIsPlaying}
				category={'CubePreview'}
				alg={'U'}
				currentAlg={currentAlg}
				edit={0}
				snap={0}
				customFacelets={previewFacelets}
				animationRef={animationRef}
			/>

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
				{/* Color selection buttons */}
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
							{color !== 'grey' && (
								<Text style={styles.colorButtonText}>
									{9 -
										Object.values(cubeState).reduce(
											(count, faceColors) => {
												return (
													count +
													faceColors.filter(
														(colors) =>
															colors === color
													).length
												)
											},
											0
										)}
								</Text>
							)}
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
		gap: 10,
		margin: 5,
		justifyContent: 'space-between',
	},
	colorSelector: {
		flexDirection: 'row',
		justifyContent: 'space-around',
		margin: 5,
		backgroundColor: 'lightgrey',
		padding: 5,
		borderRadius: 5,
	},
	colorButton: {
		width: width / 9,
		height: width / 9,
		borderRadius: 5,
		margin: 5,
		borderColor: 'grey',
		borderWidth: 1,
		justifyContent: 'center',
	},
	selectedColorButton: {
		width: width / 9,
		height: width / 9,
		borderRadius: 5,
		margin: 5,
		borderColor: 'grey',
		transform: [{ scale: 1.15 }],
		borderWidth: 1,
		justifyContent: 'center',
	},
	cubeLayout: {
		gap: 5,
		// flexDirection: 'column',
		// alignItems: 'center',
		// justifyContent: 'center',
	},
	middleRow: {
		flexDirection: 'row',
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
		borderRadius: 5,
		borderColor: '#2c2c2c',
		borderWidth: 1,
	},
	buttonContainer: {
		flexDirection: 'row',
		position: 'relative',
	},
	colorButtonText: {
		fontSize: 20,
		fontWeight: '800',
		color: 'black',
		textAlign: 'center',
	},
})

export default CubeConfigurator
