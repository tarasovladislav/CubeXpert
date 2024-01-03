import { StyleSheet, Text, View, Dimensions } from 'react-native'
import React from 'react'

import TouchableButtonTooltip from './TouchableButtonTooltip'

import commonStyles from '../commonStyles'
import { useSettingsContext } from '../Contexts/SettingsContext'
const CrossDificulty = () => {
	const { difficulty, setDifficulty } = useSettingsContext()

	const difficultyButton = (text, diff) => {
		return (
			<TouchableButtonTooltip
				text={text}
				activeColor={
					diff === difficulty
						? commonStyles.buttonActiveColor
						: commonStyles.buttonDisabledColor
				}
				onPress={() => {
					setDifficulty(diff)
				}}
			/>
		)
	}

	return (
		<View style={styles.container}>
			<Text style={styles.title}>Choose Difficulty</Text>
			<View>
				<View style={styles.buttonContainer}>
					{difficultyButton('1 move', 1)}
					{difficultyButton('2 moves', 2)}
				</View>

				<View style={styles.buttonContainer}>
					{difficultyButton('3 moves', 3)}
					{difficultyButton('4 moves', 4)}
				</View>

				<View style={styles.buttonContainer}>
					{difficultyButton('5 moves', 5)}
					{difficultyButton('6 moves', 6)}
				</View>

				<View style={styles.buttonContainer}>
					{difficultyButton('7 moves', 7)}
					{difficultyButton('8 moves', 8)}
				</View>
			</View>
		</View>
	)
}

export default CrossDificulty

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

