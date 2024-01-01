import React, { useState } from 'react'
import {
	View,
	Text,
	StyleSheet,
	Dimensions,
	TouchableOpacity,
} from 'react-native'
import Animated, {
	useSharedValue,
	useAnimatedStyle,
	withSpring,
	withTiming,
	withSequence,
	Easing,
} from 'react-native-reanimated'
import { useFocusEffect } from '@react-navigation/native'
import { LinearGradient } from 'expo-linear-gradient'

import Loading from '../Components/Loading'
import Demo from '../Components/Demo'

import commonStyles from '../commonStyles'

const Home = ({ navigation }) => {
	const [isLoading, setIsLoading] = useState(true)
	const [isDemoCubeVisible, setIsDemoCubeVisible] = useState(false)

	const scale = useSharedValue(0)

	const buttonOpacity = useSharedValue(0)
	const animatedStyles = useAnimatedStyle(() => {
		return {
			transform: [{ scale: scale.value }],
			opacity: buttonOpacity.value,
		}
	}, [])

	useFocusEffect(() => {
		setIsLoading(false)
		setIsDemoCubeVisible(true) // Hide and unmount the Demo cube WebView
		buttonOpacity.value = withTiming(1, { duration: 2000 })
		scale.value = withSequence(
			withTiming(1.2, { duration: 800, easing: Easing.ease }),
			withSpring(1, { damping: 2, stiffness: 80 })
		)
		return () => {
			setIsDemoCubeVisible(false)
			buttonOpacity.value = withTiming(0)
			scale.value = withTiming(0)
		}
	})
	if (isLoading) {
		return <Loading />
	}
	return (
		<View style={{ flex: 1 }}>
			<LinearGradient
				colors={['#1C3738', '#283d3f', '#555d5e']} // Customize these colors
				start={{ x: 3, y: 0 }} // Adjust these values for the diagonal direction
				end={{ x: 0, y: 1 }}
				style={{ flex: 1 }}
			>
				<View style={[{ flex: 1, marginTop: 50 }]}>
					<Animated.View style={[{ flex: 1 }, animatedStyles]}>
						<Text style={styles.logoText}>CubeXpert</Text>
					</Animated.View>
					<View style={{ flex: 2 }}>
						{isDemoCubeVisible && (
							<Demo demo="zzUuzzd'D'UE'D'D'E'UzzUuzzd'D'UE'D'D'E'U" />
						)}
					</View>
					<Animated.View style={[{ flex: 1 }, animatedStyles]}>
						<View style={styles.buttonContainer}>
							<View style={styles.buttonRow}>
								<TouchableOpacity
									style={styles.controlBtn}
									onPress={() => {
										navigation.navigate('Home')
									}}
								>
									<Text style={styles.buttonText}>
										Get Started
									</Text>
								</TouchableOpacity>
							</View>
						</View>
					</Animated.View>
				</View>
			</LinearGradient>
		</View>
	)
}

const width = Dimensions.get('window').width

const styles = StyleSheet.create({
	linearGradient: {
		flex: 1,
		paddingLeft: 15,
		paddingRight: 15,
		borderRadius: 5,
	},

	buttonRow: {
		flexDirection: 'row',
		height: '50%',
	},
	buttonContainer: {
		flex: 1,
		padding: 5,
		marginHorizontal: '10%',
	},

	controlBtn: {
		flex: 1,
		justifyContent: 'center',
		margin: 5,
		backgroundColor: commonStyles.demoButtonColor,
		shadowOffset: { width: 0, height: 5 },
		shadowRadius: 5.22,
		elevation: 20,
		borderRadius: 50,
		shadowOpacity: 0.33,
	},

	buttonText: {
		padding: 10,
		alignSelf: 'center',
		fontSize: 24,
		textAlign: 'center',
		color: commonStyles.buttonColor,
		fontWeight: 'bold',
	},

	logoText: {
		fontSize: 40,
		textAlign: 'center',
		marginTop: 50,
		fontWeight: '700',
		textShadowColor: commonStyles.shadowColor,
		textShadowOffset: { width: 2, height: 2 },
		textShadowRadius: 1,
		color: commonStyles.logoColor,
	},
})

export default Home
