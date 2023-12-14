import React from 'react'
import {
	StyleSheet,
	TouchableOpacity,
	Text,
	Dimensions,
	View,
} from 'react-native'
import commonStyles from '../commonStyles'
import { Image } from 'react-native-elements'
import { imageMapping } from '../assets/img/'

const MenuItem = ({ onPress = () => {}, text, image }) => {
	return (
		<View style={commonStyles.container}>
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
				{/* <TouchableOpacity style={styles.controlBtn} onPress={onPress}> */}
				<Image
					style={styles.image}
					source={imageMapping[image]}
					resizeMode="contain"
					transition={true}
				/>
				<Text style={styles.header}>{text}</Text>

				{/* {text && <Text style={styles.buttonText}>{text}</Text>} */}
			</TouchableOpacity>
		</View>
	)
}

const width = Dimensions.get('window').width

const styles = StyleSheet.create({
	controlBtn: {
		flex: 1,
		flexDirection: 'row',
		alignItems: 'center',
		backgroundColor: commonStyles.menuButtonColor,
		gap: 20,
		margin: 5,
		borderRadius: 8,
		justifyContent: 'center',
		maxHeight: 100,
		height: 100,
	},

	buttonText: {
		padding: 10,
		alignSelf: 'center',
		fontSize: 24,
		textAlign: 'center',
		color: commonStyles.buttonColor,
		fontWeight: 'bold',
	},

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
