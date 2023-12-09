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
import TouchableButton from './TouchableButton'
import IconAntDesign from 'react-native-vector-icons/AntDesign'
import { useFavoritesContext } from '../Contexts/FavoritesContext'

import IconMaterialIcons from 'react-native-vector-icons/MaterialIcons'

import commonStyles from '../commonStyles'

const CubeAnimation = ({
	category,
	alg,
	isPlaying,
	setIsPlaying,
	currentAlg,
}) => {
	const { toggleFavorites, isInFavorites } = useFavoritesContext()
	const { settings, webViewKey } = useSettingsContext()

	const [isCubeLoading, setIsCubeLoading] = useState(true)
	const [isFavorite, setIsFavorite] = useState(isInFavorites(currentAlg._id))
	const [currentStep, setCurrentStep] = useState(0)
	const [triggerUseEffect, setTriggerUseEffect] = useState(false)
	const [allowControl, setAllowControl] = useState(true)

	//For sending JS to webview
	const cubeAnimationWebView = useRef(null)

	const algArray = alg.split(' ')
	const len = algArray.length

	let { U, F, R, L, B, D, speed, cube, ignored } = settings
	let solved = ''
	let setupmoves = ''
	let colored = ''

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

	// Cube control buttons handler
	const handleButtonClick = (elementSelector) => {
		executeJavaScript(`$("${elementSelector}").click();true`)
		switch (elementSelector) {
			case '#play-1':
				setIsPlaying(true)
				break
			case '#pause-1':
				setIsPlaying(false)
				break
			case '#reset-1':
				setCurrentStep(0)
				break
			case '#prev-1':
				setCurrentStep((prevStep) => prevStep - 1)
				break
			case '#next-1':
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

	// For different categories we want some elements to be ignored, since they are not necessary
	switch (category) {
		case 'F2L':
			solved = 'U-*'
			break
		case 'OLL':
			colored = 'u'
			break
		case 'Patterns':
			setupmoves = alg
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
			<View style={[commonStyles.flex1]}>
				{isCubeLoading && (
					<View style={styles.loadingOverlay}>
						<ActivityIndicator size="large" />
					</View>
				)}
				<WebView
					source={{
						uri: `https://cube-xpert.vercel.app/?alg=${alg}&colored=${colored}
                        &speed=${speed}
                        &colors=U:${U} F:${F} R:${R} L:${L} B:${B} D:${D} ignored:${ignored} cube:${cube}
                        &hover=1 
                        &solved=${solved}
                        &setupmoves=${setupmoves}
                        `,
					}}
					ref={cubeAnimationWebView}
					key={webViewKey}
					scrollEnabled={false}
					bounces={false}
					overScrollMode={'never'}
					style={[styles.webview, { opacity: isCubeLoading ? 0 : 1 }]}
					onLoadStart={() => setIsCubeLoading(true)}
					onLoadEnd={() => setIsCubeLoading(false)}
				/>
			</View>

			<View style={styles.otherContainer}>
				<View style={{ alignItems: 'center' }}>
					<Text style={styles.algoText}>
						{currentStep > 0 &&
							algArray.slice(0, currentStep - 1).join(' ')}
						<Text style={{ fontWeight: 700 }}>
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

				<View style={styles.buttonContainer}>
					<TouchableButton
						disabled={
							currentStep === 0 ||
							isPlaying ||
							!allowControl ||
							isCubeLoading
						}
						onPress={() => handleButtonClick('#prev-1')}
						text={
							<IconAwesome
								size={24}
								color="black"
								name="arrow-left"
							/>
						}
					/>
					<TouchableButton
						disabled={
							currentStep === len ||
							isPlaying ||
							!allowControl ||
							isCubeLoading
						}
						onPress={() => handleButtonClick('#next-1')}
						text={
							<IconAwesome
								size={24}
								color="black"
								name="arrow-right"
							/>
						}
					/>
					{!isPlaying && (
						<TouchableButton
							disabled={currentStep === len || isCubeLoading}
							onPress={() => handleButtonClick('#play-1')}
							text={
								<IconAwesome
									size={24}
									color="black"
									name="play"
								/>
							}
						/>
					)}
					{isPlaying && (
						<TouchableButton
							onPress={() => handleButtonClick('#pause-1')}
							text={
								<IconAwesome
									size={24}
									color="black"
									name="pause"
								/>
							}
						/>
					)}
					<TouchableButton
						disabled={
							currentStep == 0 ||
							isPlaying ||
							!allowControl ||
							isCubeLoading
						}
						onPress={() => handleButtonClick('#reset-1')}
						text={
							<IconAwesome size={24} color="black" name="redo" />
						}
					/>
					<TouchableButton
						disabled={isCubeLoading}
						onPress={() =>
							executeJavaScript(
								`$("body").trigger("resetCamera"); true`
							)
						}
						text={
							<IconMaterialIcons
								size={24}
								color="black"
								type="material"
								name="3d-rotation"
							/>
						}
					/>
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
		</View>
	)
}

const { width } = Dimensions.get('window')

const styles = StyleSheet.create({
	webview: {
		flex: 1,
		position: 'absolute',
		top: '50%',
		left: '50%',
		width: '100%',
		height: '100%',
		transform: [{ translateX: -width / 2 }, { translateY: -width / 2 }],
		backgroundColor: 'transparent',
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
