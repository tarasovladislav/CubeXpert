import { StyleSheet, Text, View, Dimensions } from 'react-native'
import React from 'react'
import TouchableButton from './TouchableButton'
import commonStyles from '../commonStyles'

export default function CubeSizePicker({ cubeSize, setCubeSize }) {
	return (
		<View style={styles.container}>
			<Text style={styles.title}>Choose Cube Size</Text>
			<View>
				<View style={styles.buttonContainer}>
					<TouchableButton
						text="2x2x2"
						activeColor={
							cubeSize === 2
								? commonStyles.buttonActiveColor
								: commonStyles.buttonDisabledColor
						}
						onPress={() => {
							setCubeSize(2)
						}}
					/>
					<TouchableButton
						text="3x3x3"
						activeColor={
							cubeSize === 3
								? commonStyles.buttonActiveColor
								: commonStyles.buttonDisabledColor
						}
						onPress={() => {
							setCubeSize(3)
						}}
					/>
				</View>
				<View style={styles.buttonContainer}>
					<TouchableButton
						text="4x4x4"
						activeColor={
							cubeSize === 4
								? commonStyles.buttonActiveColor
								: commonStyles.buttonDisabledColor
						}
						onPress={() => {
							setCubeSize(4)
						}}
					/>
					<TouchableButton
						text="5x5x5"
						activeColor={
							cubeSize === 5
								? commonStyles.buttonActiveColor
								: commonStyles.buttonDisabledColor
						}
						onPress={() => {
							setCubeSize(5)
						}}
					/>
				</View>
				<View style={styles.buttonContainer}>
					<TouchableButton
						text="6x6x6"
						activeColor={
							cubeSize === 6
								? commonStyles.buttonActiveColor
								: commonStyles.buttonDisabledColor
						}
						onPress={() => {
							setCubeSize(6)
						}}
					/>
					<TouchableButton
						text="7x7x7"
						activeColor={
							cubeSize === 7
								? commonStyles.buttonActiveColor
								: commonStyles.buttonDisabledColor
						}
						onPress={() => {
							setCubeSize(7)
						}}
					/>
				</View>
			</View>
		</View>
	)
}

const { width } = Dimensions.get('window')

const styles = StyleSheet.create({
	buttonContainer: {
		flexDirection: 'row',
	},
	container: {
		width: width * 0.8,
	},
	title: {
		fontSize: 18,
		textAlign: 'center',
		margin: 10,
	},
})
