import {
	useSharedValue,
	withSpring,
	useAnimatedStyle,
} from 'react-native-reanimated'
import { useFocusEffect } from '@react-navigation/native'
import { Dimensions } from 'react-native'

const useAnimatedTransition = (timeout = 0) => {
	const translateX = useSharedValue(-Dimensions.get('window').width)

	const animatedStyle = useAnimatedStyle(() => {
		return {
			transform: [{ translateX: translateX.value }],
		}
	})

	useFocusEffect(() => {
		const startAnimation = () => {
			translateX.value = withSpring(0, { duration: 2500 })
		}

		const resetAnimation = () => {
			translateX.value = -Dimensions.get('window').width
		}

		const timeoutId = setTimeout(startAnimation, timeout)

		return () => {
			clearTimeout(timeoutId)
			resetAnimation()
		}
	})

	return animatedStyle
}

export default useAnimatedTransition
