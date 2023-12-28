import { StyleSheet, Text, View, Dimensions } from 'react-native'
import React from 'react'
import TouchableButton from './TouchableButton'
import commonStyles from '../commonStyles'
import { useRotateTheCubeContext } from '../Contexts/RotateTheCubeContext'

export default function CubeSizePicker({  }) {
	const { rotateTheCube, changeCubeSize } = useRotateTheCubeContext()

	return (
		<View style={styles.container}>
			<Text style={styles.title}>Choose Cube Size</Text>
			<View>
				<View style={styles.buttonContainer}>
					<TouchableButton
						text="2x2x2"
						activeColor={
							rotateTheCube.cubeSize === 2
								? commonStyles.buttonActiveColor
								: commonStyles.buttonDisabledColor
						}
						onPress={() => {
							changeCubeSize(2)
						}}
					/>
					<TouchableButton
						text="3x3x3"
						activeColor={
							rotateTheCube.cubeSize === 3
								? commonStyles.buttonActiveColor
								: commonStyles.buttonDisabledColor
						}
						onPress={() => {
							changeCubeSize(3)
						}}
					/>
				</View>
				<View style={styles.buttonContainer}>
					<TouchableButton
						text="4x4x4"
						activeColor={
							rotateTheCube.cubeSize === 4
								? commonStyles.buttonActiveColor
								: commonStyles.buttonDisabledColor
						}
						onPress={() => {
							changeCubeSize(4)
						}}
					/>
					<TouchableButton
						text="5x5x5"
						activeColor={
							rotateTheCube.cubeSize === 5
								? commonStyles.buttonActiveColor
								: commonStyles.buttonDisabledColor
						}
						onPress={() => {
							changeCubeSize(5)
						}}
					/>
				</View>
				<View style={styles.buttonContainer}>
					<TouchableButton
						text="6x6x6"
						activeColor={
							rotateTheCube.cubeSize === 6
								? commonStyles.buttonActiveColor
								: commonStyles.buttonDisabledColor
						}
						onPress={() => {
							changeCubeSize(6)
						}}
					/>
					<TouchableButton
						text="7x7x7"
						activeColor={
							rotateTheCube.cubeSize === 7
								? commonStyles.buttonActiveColor
								: commonStyles.buttonDisabledColor
						}
						onPress={() => {
							changeCubeSize(7)
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
