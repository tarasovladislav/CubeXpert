import { StyleSheet, Text, TouchableOpacity, Dimensions } from 'react-native'
import React from 'react'
import commonStyles from '../commonStyles'
import { Image } from 'react-native-elements'
import { imageMapping } from '../assets/img/'
import Animated from 'react-native-reanimated'
import useMenuItemAnimation from '../Hooks/useMenuItemAnimation'
const LessonMenuItem = ({ lesson, navigation, timeout = 1 }) => {
	const animatedStyle = useMenuItemAnimation(timeout)

	return (
		<Animated.View style={[commonStyles.container, animatedStyle]}>
			<TouchableOpacity
				style={{
					flexDirection: 'row',
					alignItems: 'center',
					gap: 20,
					margin: 10,
					width: '100%',
				}}
				onPress={() =>
					navigation.navigate('Lesson', {
						name: lesson.stepTitle,
						data: lesson,
					})
				}
			>
				<Image
					style={styles.image}
					source={imageMapping[`${lesson.to.toLowerCase()}`]}
					resizeMode="contain"
					transition={true}
				/>

				<Text style={styles.header}>{lesson.stepTitle}</Text>
			</TouchableOpacity>
		</Animated.View>
	)
}
const width = Dimensions.get('window').width

const styles = StyleSheet.create({
	image: {
		width: width / 5,
		height: width / 5,
	},
	header: {
		fontSize: 22,
		fontWeight: '600',
		color: commonStyles.buttonColor,
	},
})

export default LessonMenuItem
