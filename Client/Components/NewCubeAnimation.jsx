import React, { useRef, useState, useEffect } from 'react'
import {
	View,
	StyleSheet,
	Dimensions,
	Text,
	TouchableOpacity,
	ActivityIndicator,
} from 'react-native'
import { WebView } from 'react-native-webview'
import { useSettingsContext } from '../Contexts/SettingsContext'

import IconAwesome from 'react-native-vector-icons/FontAwesome5'
import IconAntDesign from 'react-native-vector-icons/AntDesign'
import * as icons from 'react-native-vector-icons'
import { useFavoritesContext } from '../Contexts/FavoritesContext'

import commonStyles from '../commonStyles'
import TouchableButtonTooltip from './TouchableButtonTooltip'
import { BASE_URL } from '../env'

const CubeAnimation = ({
	category,
	alg,
	isPlaying,
	setIsPlaying,
	currentAlg,
	scramble = 0,
	cubeSize = 3,
	demo = '',
}) => {
	const { toggleFavorites, isInFavorites } = useFavoritesContext()
	const { settings, webViewKey } = useSettingsContext()
	const [isRotated, setIsRotated] = useState(false)
	const [isCubeLoading, setIsCubeLoading] = useState(true)
	const [isFavorite, setIsFavorite] = useState(isInFavorites(currentAlg._id))
	const [currentStep, setCurrentStep] = useState(0)
	const [triggerUseEffect, setTriggerUseEffect] = useState(false)
	const [allowControl, setAllowControl] = useState(true)

	//For sending JS to webview
	const cubeAnimationWebView = useRef(null)

	const algArray = alg.split(' ')
	const len = algArray.length

	let {
		U,
		F: front,
		R: right,
		L: left,
		B: back,
		D,
		speed,
		cube,
		ignored,
	} = settings
	let solved = ''
	let setupmoves = ''
	let colored = ''
	let facelets
	useEffect(() => {
		setL(left)
		setF(front)
		setR(right)
		setB(back)
	}, [front, right, left, back])

	// facelets = 'uuuuuuuuudddddddddfffffffffbbbbbbbbblllllllllrrrrrrrrr'
	// facelets = 'qqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqq'
	// facelets = 'wLwLwLwLwyLyLyLyLygLgLgLgLgbLbLbLbLboLoLoLoLorLrLrLrLr'
	const [F, setF] = useState(front)
	const [L, setL] = useState(left)
	const [B, setB] = useState(back)
	const [R, setR] = useState(right)
	const handleRecolor = () => {
		let temp = L
		setL(F)
		setF(R)
		setR(B)
		setB(temp)
		setCurrentStep(0)
		setIsRotated(false)
	}

	// When user changes his settings, the webview resets the cube since its the new request, we have to restore current algorithm step (Start from the beginning)
	useEffect(() => {
		setCurrentStep(0)
	}, [settings])

	// When user changes algorithm, we reset the cube state
	useEffect(() => {
		setCurrentStep(0)
		setIsPlaying(false)
	}, [alg])

	// Starting an Settimeout to highlight the current step of the cube whenever user press Play button
	useEffect(() => {
		if (isPlaying) {
			setAllowControl(false)
			if (currentStep === len - 1) setIsPlaying(false)
			setCurrentStep((prevStep) => prevStep + 1)
			setTimeout(
				() => {
					setTriggerUseEffect(!triggerUseEffect) // using for run this useEffect once again if the cube is not at the last step yet.
					setAllowControl(true)
				},
				algArray[currentStep].includes('2')
					? parseFloat(speed) * 1.5
					: parseFloat(speed)
			) // Dynamic timeout since when the move is doubled (U2, D2 ...) the animation takes 1.5x more time.
		}
	}, [isPlaying, triggerUseEffect])

	const { width } = Dimensions.get('window')

	// Cube control buttons handler
	const handleButtonClick = (elementSelector) => {
		executeJavaScript(`clickCanvas(${width}, ${elementSelector});true`)
		switch (elementSelector) {
			case 1.5:
				setIsPlaying(true)

				break
			case 2:
				setIsPlaying(false)

				break
			case 0:
				setCurrentStep(0)
				setIsRotated(false)
				break
			case 4:
				setCurrentStep((prevStep) => prevStep - 1)
				break
			case 1.25:
				setCurrentStep((prevStep) => prevStep + 1)
				break
			default:
				break
		}
	}

	// Helper function to send JS code to our webview to proceed with cube movements
	const executeJavaScript = (jsCode) => {
		cubeAnimationWebView.current &&
			cubeAnimationWebView.current.injectJavaScript(jsCode)
	}

	function manipulateString(inputString) {
		let outputArray = []
		let inputArray = inputString.split(' ')

		let xMoves = 0
		let yMoves = 0
		let zMoves = 0

		for (let i = 0; i < inputArray.length; i++) {
			if (
				inputArray[i] === 'x2' ||
				inputArray[i] === 'M2' ||
				inputArray[i] === 'r2' ||
				inputArray[i] === 'l2'
			) {
				xMoves = xMoves + 2
			}
			if (inputArray[i] === 'y2') yMoves = yMoves + 2

			if (
				inputArray[i] === 'x' ||
				inputArray[i] === "l'" ||
				inputArray[i] === 'r' ||
				inputArray[i] === "M'"
			) {
				xMoves++
			}
			if (
				inputArray[i] === "x'" ||
				inputArray[i] === 'l' ||
				inputArray[i] === "r'" ||
				inputArray[i] === 'M'
			) {
				xMoves--
			}

			if (inputArray[i] === 'y' || inputArray[i] === "d'") yMoves++

			if (inputArray[i] === "y'" || inputArray[i] === 'd') yMoves--

			if (inputArray[i] === 'z') zMoves++
			if (inputArray[i] === "z'") zMoves--
		}

		if (xMoves > 0) {
			for (let i = 0; i < Math.abs(xMoves); i++) {
				outputArray.push("x'")
			}
		} else if (xMoves < 0) {
			for (let i = 0; i < Math.abs(xMoves); i++) {
				outputArray.push('x')
			}
		}

		if (yMoves > 0) {
			for (let i = 0; i < Math.abs(yMoves); i++) {
				outputArray.push("y'")
			}
		} else if (yMoves < 0) {
			for (let i = 0; i < Math.abs(yMoves); i++) {
				outputArray.push('y')
			}
		}

		if (zMoves > 0) {
			for (let i = 0; i < Math.abs(zMoves); i++) {
				outputArray.push("z'")
			}
		} else if (zMoves < 0) {
			for (let i = 0; i < Math.abs(zMoves); i++) {
				outputArray.push('z')
			}
		}

		return inputArray.join(' ') + ' ' + outputArray.join(' ')
	}

	// For different categories we want some elements to be ignored, since they are not necessary
	switch (category) {
		case 'F2L':
			// solved = "U-*"
			// facelets = 'uuuuuuuuudddddddddfffffffffbbbbbbbbblllllllllrrrrrrrrr'
			facelets = 'qqqqqqqqq111111111q22q22q22q33q33q33qqq444444q55q55q55'
			setupmoves = manipulateString(alg)
			break
		case 'OLL':
			// colored = "u"
			// facelets = 'uuuuuuuuudddddddddfffffffffbbbbbbbbblllllllllrrrrrrrrr'
			facelets = '000000000qqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqq'
			setupmoves = manipulateString(alg)

			break
		case 'PLL':
			// colored = "u"
			// facelets = 'uuuuuuuuudddddddddfffffffffbbbbbbbbblllllllllrrrrrrrrr'
			facelets = '000000000qqqqqqqqq2qq2qq2qq3qq3qq3qq444qqqqqq5qq5qq5qq'
			setupmoves = manipulateString(alg)

			break
		case 'Patterns':
			setupmoves = ''
			// facelets = 'uuuuuuuuudddddddddfffffffffbbbbbbbbblllllllllrrrrrrrrr'

			break
		case 'Beginners':
			colored = currentAlg.colored || ''
			setupmoves = currentAlg.setupmoves || ''
			switch (currentAlg.subset) {
				// When learning how to solve cross, we have to rotate cube but instead we just mirror the colors
				case 'Cross':
					;[U, D] = [D, U]
					;[F, R] = [R, F]
					;[B, L] = [L, B]
					colored = currentAlg.colored || 'U*/Ie U F R'
					//TODO change to facelets
					setupmoves = currentAlg.setupmoves || ''
					break
				default:
					break
			}

			break
		default:
			break
	}

	return (
		<View style={[commonStyles.flex1]}>
			<View style={[commonStyles.flex1, {}]}>
				{isCubeLoading && (
					<View style={styles.loadingOverlay}>
						<ActivityIndicator size="large" />
					</View>
				)}
				<WebView
					source={{
						uri: `${BASE_URL}/rotate?cubesize=${cubeSize}&scramble=${scramble}&cubecolor=${cube.replace(
							'#',
							''
						)}&initmove=${setupmoves}&move=${alg}&colors=${U.replace(
							'#',
							''
						)}${D.replace('#', '')}${F.replace('#', '')}${B.replace(
							'#',
							''
						)}${L.replace('#', '')}${R.replace('#', '')}${R.replace(
							'#',
							''
						)}&colorscheme=012345&speed=${speed}&facelets=${facelets}&ignored=${ignored}&bgcolor=e7f0f8&demo=${demo}`,
					}}
					ref={cubeAnimationWebView}
					key={webViewKey}
					scrollEnabled={false}
					bounces={false}
					overScrollMode={'never'}
					style={[styles.webview, { opacity: isCubeLoading ? 0 : 1 }]}
					onLoadStart={() => setIsCubeLoading(true)}
					onLoadEnd={() => setIsCubeLoading(false)}
					onTouchStart={() => {
						setIsRotated(true)
					}}
				/>
			</View>

			{scramble === 0 && (
				<View style={styles.otherContainer}>
					<View style={{ alignItems: 'center' }}>
						<Text style={styles.algoText}>
							{currentStep > 0 &&
								algArray.slice(0, currentStep - 1).join(' ')}
							<Text style={{ fontWeight: '700' }}>
								{currentStep > 1 ? ' ' : ''}
								{algArray[currentStep - 1]}
								{currentStep > 0 ? ' ' : ''}
							</Text>
							{algArray.slice(currentStep).join(' ')}
						</Text>
						<Text style={styles.algoText}>
							{currentStep} / {len}
						</Text>
					</View>
					{/* сверху можно убрать на раондоме */}

					<View style={styles.buttonContainer}>
						{/* // 1 последняя
                        // 1.25 next
                        // 1.5 плей
                        // 2. средняя
                        // 0 reset
                        //3 назад плей
                        //4 назад */}
						<TouchableButtonTooltip
							disabled={
								currentStep === 0 ||
								isPlaying ||
								!allowControl ||
								isCubeLoading
							}
							onPress={() => handleButtonClick(4)}
							text={
								<IconAwesome
									size={24}
									color="black"
									name="arrow-left"
								/>
							}
							popover="Previous Move"
						/>
						<TouchableButtonTooltip
							disabled={
								currentStep === len ||
								isPlaying ||
								!allowControl ||
								isCubeLoading
							}
							onPress={() => handleButtonClick(1.25)}
							text={
								<IconAwesome
									size={24}
									color="black"
									name="arrow-right"
								/>
							}
							popover="Next Move"
						/>
						{!isPlaying && (
							<TouchableButtonTooltip
								disabled={currentStep === len || isCubeLoading}
								onPress={() => handleButtonClick(1.5)}
								text={
									<IconAwesome
										size={24}
										color="black"
										name="play"
									/>
								}
								popover="Play"
							/>
						)}
						{isPlaying && (
							<TouchableButtonTooltip
								onPress={() => handleButtonClick(2)}
								text={
									<IconAwesome
										size={24}
										color="black"
										name="pause"
									/>
								}
								popover="Pause Rotation"
							/>
						)}

						<TouchableButtonTooltip
							// disabled={currentStep == 0 || isPlaying || !allowControl || isCubeLoading}

							//TODO add checker if cube was turned
							disabled={
								isPlaying || !allowControl || isCubeLoading
							}
							onPress={() => handleButtonClick(0)}
							text={
								<IconAwesome
									size={24}
									color="black"
									name="redo"
								/>
							}
							popover="Reset Cube"
						/>
						{(category === 'F2L' || category === 'PLL') && (
							<TouchableButtonTooltip
								// disabled={currentStep == 0 || isPlaying || !allowControl || isCubeLoading}

								//TODO add checker if cube was turned
								disabled={
									isPlaying || !allowControl || isCubeLoading
								}
								onPress={() => handleRecolor()}
								text={
									// 'recolor'
									<icons.Feather
										size={24}
										color="black"
										name="repeat"
									/>
								}
								popover="Swap Colors"
							/>
						)}
					</View>

					<TouchableOpacity
						style={{
							flex: 0,
							position: 'absolute',
							bottom: 55,
							right: 10,
							zIndex: 2,
						}}
						onPress={() => {
							toggleFavorites(currentAlg)
							setIsFavorite(!isFavorite)
						}}
					>
						<IconAntDesign
							size={30}
							color="orange"
							name={isFavorite ? 'star' : 'staro'}
							style={{ padding: 5 }}
						/>
					</TouchableOpacity>
				</View>
			)}
		</View>
	)
}

const { width } = Dimensions.get('window')

const styles = StyleSheet.create({
	webview: {
		maxHeight: width * 1.49,
	},
	buttonContainer: {
		position: 'relative',
		flexDirection: 'row',
	},
	algoText: {
		textAlign: 'center',
		fontSize: 16,
		width: '80%',
	},
	loadingOverlay: {
		...StyleSheet.absoluteFillObject,
		...commonStyles.cencen,
	},
})

export default CubeAnimation
