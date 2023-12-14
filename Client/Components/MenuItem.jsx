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
        height:100
	},

	buttonText: {
		padding: 10,
		alignSelf: 'center',
		fontSize: 24,
		textAlign: 'center',
		color: commonStyles.buttonColor,
		fontWeight: 'bold',
	},
})

export default MenuItem
