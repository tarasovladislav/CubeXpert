import { StyleSheet, Text, View, Dimensions } from 'react-native'
import React from 'react'
import TouchableButton from './TouchableButton'
import commonStyles from '../commonStyles'
import { useRotateTheCubeContext } from '../Contexts/RotateTheCubeContext'

export default function CubeSizePicker({}) {
	const { rotateTheCube, changeCubeSize } = useRotateTheCubeContext()

	const cubeSizeButton = (text, size) => {
		return (
			<TouchableButton
				text={text}
				activeColor={
					rotateTheCube.cubeSize === size
						? commonStyles.buttonActiveColor
						: commonStyles.buttonDisabledColor
				}
				onPress={() => {
					changeCubeSize(size)
				}}
			/>
		)
	}

	return (
		<View style={styles.container}>
			<Text style={styles.title}>Choose Cube Size</Text>
			<View>
				<View style={styles.buttonContainer}>
					{cubeSizeButton('2x2x2', 2)}
					{cubeSizeButton('3x3x3', 3)}
				</View>
				<View style={styles.buttonContainer}>
					{cubeSizeButton('4x4x4', 4)}
					{cubeSizeButton('5x5x5', 5)}
				</View>
				<View style={styles.buttonContainer}>
					{cubeSizeButton('6x6x6', 6)}
					{cubeSizeButton('7x7x7', 7)}
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
