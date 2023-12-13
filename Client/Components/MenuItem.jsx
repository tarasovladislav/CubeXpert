import React from 'react'
import { StyleSheet, TouchableOpacity, Text,  } from 'react-native'
import commonStyles from '../commonStyles'

const MenuItem = ({ onPress = () => {}, text,  }) => {
	return (
		<TouchableOpacity style={styles.controlBtn} onPress={onPress}>
			{text && <Text style={styles.buttonText}>{text}</Text>}
		</TouchableOpacity>
	)
}
const styles = StyleSheet.create({
	// controlBtn: {
	// 	flex: 1,
	// 	justifyContent: 'center',
	// 	margin: 10,
	// 	backgroundColor: '#ffffff',
	// 	shadowOffset: { width: 0, height: 2 },
	// 	shadowRadius: 2.22,
	// 	elevation: 3,
	// 	borderRadius: 8,
	// 	shadowOpacity: 0.23,
	// },
	// controlBtn: {
	// 	flex: 1,
	// 	justifyContent: 'center',
	// 	margin: 5,
	// 	backgroundColor: commonStyles.menuButtonColor,
	// 	shadowOffset: { width: 0, height: 1 },
	// 	shadowRadius: 2.22,
	// 	elevation: 8,
	// 	borderRadius: 50,
	// 	shadowOpacity: 0.33,
	// },
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
		// width: '100%',
	},

	buttonText: {
		padding: 10,
		alignSelf: 'center',
		fontSize: 24,
		textAlign: 'center',
		color: commonStyles.buttonColor,
		fontWeight: 'bold',
	},

	// buttonText: {
	// 	padding: 10,
	// 	alignSelf: 'center',
	// 	fontSize: 20,
	// 	textAlign: 'center',
	//     color:commonStyles.buttonColor
	// 	// fontWeight: 'bold',
	// },

	// buttonText: {
	// 	padding: 10,
	// 	alignSelf: 'center',
	// 	fontSize: 24,
	// 	textAlign: 'center',
	// 	fontWeight: 'bold',
	// },
})

export default MenuItem
