import React from 'react'
import { StyleSheet, TouchableOpacity, Text } from 'react-native'

const MenuItem = ({ onPress = () => {}, text, children }) => {
	return (
		<TouchableOpacity style={styles.controlBtn} onPress={onPress}>
			{text && <Text style={styles.buttonText}>{text}</Text>}
			{children}
		</TouchableOpacity>
	)
}
const styles = StyleSheet.create({
	controlBtn: {
		flex: 1,
		justifyContent: 'center',
		margin: 10,
		backgroundColor: '#ffffff',
		shadowOffset: { width: 0, height: 2 },
		shadowRadius: 2.22,
		elevation: 3,
		borderRadius: 8,
		shadowOpacity: 0.23,
	},

	buttonText: {
		padding: 10,
		alignSelf: 'center',
		fontSize: 24,
		textAlign: 'center',
		fontWeight: 'bold',
	},
})

export default MenuItem
