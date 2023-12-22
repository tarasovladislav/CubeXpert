import React, { useState, useEffect } from 'react'
import { View, StyleSheet, Dimensions, ActivityIndicator } from 'react-native'
import { WebView } from 'react-native-webview'
import { useSettingsContext } from '../Contexts/SettingsContext'
import commonStyles from '../commonStyles'
import { BASE_URL } from '../env'
import Animated, {
	useSharedValue,
	useAnimatedStyle,
	withSpring,
	withTiming,
    withSequence,
    Easing
} from 'react-native-reanimated'

const Demo = ({ demo = '', cubeSize = 3 }) => {
	const { settings, webViewKey } = useSettingsContext()
	const [isCubeLoading, setIsCubeLoading] = useState(true)
	let { U, F, R, L, B, D, cube } = settings

	//animated
	const borderRadius = useSharedValue(50)

    const scale = useSharedValue(0)

	const animatedStyles = useAnimatedStyle(() => {
		return {
			// opacity: opacity.value,
            transform: [{ scale: scale.value }],

			borderRadius: borderRadius.value,
		}
	}, [])

	useEffect(() => {
		if (!isCubeLoading) {
            scale.value = withSequence(
                withTiming(1.5, { duration: 150, easing: Easing.ease }),
                withSpring(1, { damping: 2, stiffness: 80 })
            )
			borderRadius.value = withTiming(1000, { duration: 3000 })
		}
	}, [isCubeLoading])

	return (
		<View style={[commonStyles.flex1]}>
			<View style={[commonStyles.flex1]}>
				{isCubeLoading && (
					<View style={styles.loadingOverlay}>
						{/* <ActivityIndicator size="large" /> */}
					</View>
				)}
				{/* <Animated.View style={[styles.shadow, animatedStyles]}> */}
					<Animated.View
						style={[
							styles.webviewWrapper,
							animatedStyles,
							{ opacity: isCubeLoading ? 0 : 1 },
						]}
					>
						<WebView
							source={{
								uri: `${BASE_URL}/rotate?cubesize=${cubeSize}&cubecolor=${cube.replace(
									'#',
									''
								)}&colors=${U.replace('#', '')}${D.replace(
									'#',
									''
								)}${F.replace('#', '')}${B.replace(
									'#',
									''
								)}${L.replace('#', '')}${R.replace(
									'#',
									''
								)}${R.replace(
									'#',
									''
								)}&colorscheme=012345&speed=600}&bgcolor=${commonStyles.demoCubeBackground.replace(
									'#',
									''
								)}&demo=${demo}`,
							}}
							key={webViewKey}
							scrollEnabled={false}
							bounces={false}
							overScrollMode={'never'}
							style={[
								styles.webview,
								{ opacity: isCubeLoading ? 0 : 1 },
							]}
							onLoadStart={() => setIsCubeLoading(true)}
							onLoadEnd={() => setIsCubeLoading(false)}
						/>
					</Animated.View>
				{/* </Animated.View> */}
			</View>
		</View>
	)
}

const { width } = Dimensions.get('window')

const styles = StyleSheet.create({
	webview: {
		flex: 1,
		margin: -2,
		backgroundColor: commonStyles.demoCubeBackground,
		borderRadius: 50,
	},
	webviewWrapper: {
		flex: 1,
		marginHorizontal: '20%',
		// borderRadius: 1000,
		overflow: 'hidden',
		maxWidth: width * 0.8,
		maxHeight: width * 0.6,
		shadowColor: commonStyles.shadowColor,
		elevation: 50, //android shadow
        // backgroundColor: commonStyles.demoCubeBackground,

        // shadowOffset: {
		// 	width: 0,
		// 	height: 12,
		// },
		// shadowOpacity: 0.98,
		// shadowRadius: 100.0,
	},
	shadow: {
		//ios shadow
		flex: 1,
		borderRadius: 1000,
		shadowColor: commonStyles.shadowColor,
		shadowOffset: {
			width: 0,
			height: 12,
		},
		shadowOpacity: 0.98,
		shadowRadius: 100.0,
	},
})

export default Demo
