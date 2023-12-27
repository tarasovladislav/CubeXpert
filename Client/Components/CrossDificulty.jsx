import { StyleSheet, Text, View, Dimensions } from 'react-native'
import React from 'react'
import TouchableButton from './TouchableButton'
import commonStyles from '../commonStyles'

const CrossDificulty = ({ difficulty, setDifficulty }) => {
	return (
		<View style={styles.container}>
			<Text style={styles.title}>Choose Difficulty</Text>
			<View>
				<View style={styles.buttonContainer}>
					<TouchableButton
						text="1 move"
						activeColor={
							difficulty === 1
								? commonStyles.buttonActiveColor
								: commonStyles.buttonDisabledColor
						}
						onPress={() => {
							setDifficulty(1)
						}}
					/>
					<TouchableButton
						text="2 moves"
						activeColor={
							difficulty === 2
								? commonStyles.buttonActiveColor
								: commonStyles.buttonDisabledColor
						}
						onPress={() => {
							setDifficulty(2)
						}}
					/>
				</View>

				<View style={styles.buttonContainer}>
					<TouchableButton
						text="3 moves"
						activeColor={
							difficulty === 3
								? commonStyles.buttonActiveColor
								: commonStyles.buttonDisabledColor
						}
						onPress={() => {
							setDifficulty(3)
						}}
					/>
					<TouchableButton
						text="4 moves"
						activeColor={
							difficulty === 4
								? commonStyles.buttonActiveColor
								: commonStyles.buttonDisabledColor
						}
						onPress={() => {
							setDifficulty(4)
						}}
					/>
				</View>
				<View style={styles.buttonContainer}>
					<TouchableButton
						text="5 moves"
						activeColor={
							difficulty === 5
								? commonStyles.buttonActiveColor
								: commonStyles.buttonDisabledColor
						}
						onPress={() => {
							setDifficulty(5)
						}}
					/>
					<TouchableButton
						text="6 moves"
						activeColor={
							difficulty === 6
								? commonStyles.buttonActiveColor
								: commonStyles.buttonDisabledColor
						}
						onPress={() => {
							setDifficulty(6)
						}}
					/>
				</View>

				<View style={styles.buttonContainer}>
					<TouchableButton
						text="7 moves"
						activeColor={
							difficulty === 7
								? commonStyles.buttonActiveColor
								: commonStyles.buttonDisabledColor
						}
						onPress={() => {
							setDifficulty(7)
						}}
					/>
					<TouchableButton
						text="8 moves"
						activeColor={
							difficulty === 8
								? commonStyles.buttonActiveColor
								: commonStyles.buttonDisabledColor
						}
						onPress={() => {
							setDifficulty(8)
						}}
					/>
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
