import React, { useState, useMemo } from 'react'
import {
	SafeAreaView,
	StyleSheet,
	View,
	TouchableOpacity,
	Text,
} from 'react-native'
import { Overlay } from 'react-native-elements'
import getRandomSolve from 'rubiks-cross-trainer'

import IconAwesome from 'react-native-vector-icons/FontAwesome5'

import ProfileSettings from '../Components/ProfileSettings'
import TouchableButtonTooltip from '../Components/TouchableButtonTooltip'
import NewCubeAnimation from '../Components/NewCubeAnimation'
import CrossDificulty from '../Components/CrossDificulty'

import { useSettingsContext } from '../Contexts/SettingsContext'

const CrossTrainer = () => {
	const { difficulty } = useSettingsContext()

	const [animationKey, setAnimationKey] = useState(0)

	const scramble = useMemo(
		() => getRandomSolve(difficulty),
		[animationKey, difficulty]
	)

	const [settingsVisible, setSettingsVisible] = useState(false)
	const toggleSettings = () => setSettingsVisible(!settingsVisible)
    
	const [difficultyVisible, setDifficultyVisible] = useState(false)
	const toggleDifficulty = () => setDifficultyVisible(!difficultyVisible)

	return (
		<SafeAreaView style={{ flex: 1 }}>
			<Overlay
				isVisible={settingsVisible}
				onBackdropPress={toggleSettings}
				animationType="fade"
			>
				<ProfileSettings />
			</Overlay>

			<Overlay
				isVisible={difficultyVisible}
				onBackdropPress={toggleDifficulty}
				animationType="fade"
			>
				<CrossDificulty />
			</Overlay>
			<NewCubeAnimation
				cubeSize={3}
				key={animationKey}
				category={'CrossTraining'}
				alg={scramble}
				edit={1}
				snap={1}
				onSuccessfulSolve={() => setAnimationKey(animationKey + 1)}
			/>
			<View style={styles.otherContainer}>
				<View style={{ alignItems: 'center' }}>
					<Text style={styles.algoText}>{scramble}</Text>
				</View>
			</View>
			<View style={[styles.buttonContainer]}>
				<TouchableButtonTooltip
					onPress={toggleDifficulty}
					text="Change Difficulty"
				/>
				<TouchableButtonTooltip
					onPress={() => setAnimationKey(animationKey + 1)}
					text="Another Scramble"
				/>
			</View>

			<View style={styles.buttonContainer}></View>

			<TouchableOpacity
				onPress={toggleSettings}
				style={{
					flex: 0,
					position: 'absolute',
					top: 10,
					right: 10,
					zIndex: 2,
				}}
			>
				<IconAwesome
					size={30}
					color="black"
					name="cog"
					style={{ padding: 5 }}
				/>
			</TouchableOpacity>
		</SafeAreaView>
	)
}

const styles = StyleSheet.create({
	buttonContainer: {
		position: 'relative',
		flexDirection: 'row',
	},
	otherContainer: {
		flexDirection: 'row',
		justifyContent: 'center',
		alignItems: 'center',
	},
	algoText: {
		textAlign: 'center',
		fontSize: 16,
		width: '80%',
	},
})
export default CrossTrainer
