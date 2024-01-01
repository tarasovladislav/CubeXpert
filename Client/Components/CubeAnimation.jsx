import React, { useRef, useState, useEffect } from 'react'
import {
	View,
	StyleSheet,
	Dimensions,
	Text,
	TouchableOpacity,
	ActivityIndicator,
} from 'react-native'
import Animated, {
	useSharedValue,
	useAnimatedStyle,
	withSpring,
	withTiming,
	withSequence,
	Easing,
} from 'react-native-reanimated'
import { WebView } from 'react-native-webview'

import * as icons from 'react-native-vector-icons'

import TouchableButtonTooltip from './TouchableButtonTooltip'

import commonStyles from '../commonStyles'
import { BASE_URL } from '../env'
import { useSettingsContext } from '../Contexts/SettingsContext'
import { useFavoritesContext } from '../Contexts/FavoritesContext'
const CubeAnimation = ({
	category,
	alg,
	isPlaying,
	setIsPlaying,
	currentAlg,
}) => {
	const { toggleFavorites, isInFavorites } = useFavoritesContext()
	const { settings, webViewKey, setWebViewKey } = useSettingsContext()

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

	useEffect(() => {
		setL(left)
		setF(front)
		setR(right)
		setB(back)
	}, [front, right, left, back])
	const [F, setF] = useState(front)
	const [L, setL] = useState(left)
	const [B, setB] = useState(back)
	const [R, setR] = useState(right)
	const handleRecolor = () => {
		setWebViewKey(webViewKey + 1)
		let temp = L
		setL(F)
		setF(R)
		setR(B)
		setB(temp)
		setCurrentStep(0)
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
					;[front, right] = [right, front]
					;[back, left] = [left, back]
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
	const scale = useSharedValue(0)

	const animatedStyles = useAnimatedStyle(() => {
		return {
			transform: [{ scale: scale.value }],
		}
	}, [])

	useEffect(() => {
		if (!isCubeLoading) {
			scale.value = withSequence(
				withTiming(1.2, { duration: 200, easing: Easing.ease }),
				withSpring(1, { damping: 2, stiffness: 80 })
				// withSpring(1, { damping: 2, stiffness: 80 })
			)
		}
		return () => {
			scale.value = withTiming(0)
		}
	}, [isCubeLoading])

	return (
		<View style={{ flex: 1 }}>
			<Animated.View style={[{ flex: 1 }, animatedStyles]}>
				{isCubeLoading && (
					<View style={styles.loadingOverlay}>
						<ActivityIndicator size="large" />
					</View>
				)}
				<WebView
					source={{
						uri: `${BASE_URL}/?alg=${alg}&colored=${colored}
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
			</Animated.View>

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

				<View style={styles.buttonContainer}>
					<TouchableButtonTooltip
						disabled={
							currentStep === 0 ||
							isPlaying ||
							!allowControl ||
							isCubeLoading
						}
						onPress={() => handleButtonClick('#prev-1')}
						text={
							<icons.FontAwesome5
								size={24}
								color={commonStyles.iconColor}
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
						onPress={() => handleButtonClick('#next-1')}
						text={
							<icons.FontAwesome5
								size={24}
								color={commonStyles.iconColor}
								name="arrow-right"
							/>
						}
						popover="Next Move"
					/>
					{!isPlaying && (
						<TouchableButtonTooltip
							disabled={currentStep === len || isCubeLoading}
							onPress={() => handleButtonClick('#play-1')}
							text={
								<icons.FontAwesome5
									size={24}
									color={commonStyles.iconColor}
									name="play"
								/>
							}
							popover="Play"
						/>
					)}
					{isPlaying && (
						<TouchableButtonTooltip
							onPress={() => handleButtonClick('#pause-1')}
							text={
								<icons.FontAwesome5
									size={24}
									color={commonStyles.iconColor}
									name="pause"
								/>
							}
							popover="Pause Rotation"
						/>
					)}
					<TouchableButtonTooltip
						disabled={
							currentStep == 0 ||
							isPlaying ||
							!allowControl ||
							isCubeLoading
						}
						onPress={() => handleButtonClick('#reset-1')}
						text={
							<icons.FontAwesome5
								size={24}
								color={commonStyles.iconColor}
								name="redo"
							/>
						}
						popover="Reset Cube"
					/>
					<TouchableButtonTooltip
						disabled={isCubeLoading}
						onPress={() =>
							executeJavaScript(
								`$("body").trigger("resetCamera"); true`
							)
						}
						text={
							<icons.MaterialIcons
								size={24}
								color={commonStyles.iconColor}
								type="material"
								name="3d-rotation"
							/>
						}
						popover="Reset Cube Position"
					/>
					{category !== 'OLL' && (
						<TouchableButtonTooltip
							disabled={
								isPlaying || !allowControl || isCubeLoading
							}
							onPress={handleRecolor}
							text={
								// 'recolor'
								<icons.Feather
									size={24}
									color={commonStyles.iconColor}
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
					<icons.AntDesign
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
