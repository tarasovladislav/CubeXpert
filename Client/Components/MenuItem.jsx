import React from 'react'
import { StyleSheet, TouchableOpacity, Text, Dimensions } from 'react-native'
import Animated from 'react-native-reanimated'
import { Image } from 'react-native-elements'

import { imageMapping } from '../assets/img/'
import useMenuItemAnimation from '../Hooks/useMenuItemAnimation'
import commonStyles from '../commonStyles'

const MenuItem = ({ onPress = () => {}, text, image, timeout = 1 }) => {
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
				onPress={onPress}
			>
				<Image
					style={styles.image}
					source={imageMapping[image]}
					resizeMode="contain"
					transition={true}
				/>
				<Text style={styles.header}>{text}</Text>
			</TouchableOpacity>
		</Animated.View>
	)
}

const width = Dimensions.get('window').width

const styles = StyleSheet.create({
	image: {
		width: width / 4,
		height: width / 4,
	},
	header: {
		fontSize: 22,
		fontWeight: '600',
		color: commonStyles.buttonColor,
	},
})

export default MenuItem
