import React, { useEffect, useState, useMemo } from 'react'
import {
	SafeAreaView,
	StyleSheet,
	View,
	TouchableOpacity,
	Text,
} from 'react-native'
import { Overlay } from 'react-native-elements'
import ProfileSettings from '../Components/ProfileSettings'
import TouchableButton from '../Components/TouchableButton'

import getRandomSolve from 'rubiks-cross-trainer'
import NewCubeAnimation from '../Components/NewCubeAnimation'
import CubeSizePicker from '../Components/CubeSizePicker'
import IconAwesome from 'react-native-vector-icons/FontAwesome5'
import CrossDificulty from '../Components/CrossDificulty'

const CrossTrainer = () => {
	const [animationKey, setAnimationKey] = useState(0)
	const [difficulty, setDifficulty] = useState(1)
	const scramble = useMemo(
		() => getRandomSolve(difficulty),
		[animationKey, difficulty]
	)

	const [visible, setVisible] = useState(false)
	const toggleOverlay = () => setVisible(!visible)
	const [isPlaying, setIsPlaying] = useState(false)
	const [currentAlg, setCurrentAlg] = useState({
		algo: ['U'],
		category: 'CrossTraining',
	})
	const [difficultyVisible, setDifficultyVisible] = useState(false)
	const toggleDifficulty = () => setDifficultyVisible(!difficultyVisible)

	return (
		<SafeAreaView style={{ flex: 1 }}>
			<Overlay
				isVisible={visible}
				onBackdropPress={toggleOverlay}
				animationType="fade"
			>
				<ProfileSettings />
			</Overlay>

			<Overlay
				isVisible={difficultyVisible}
				onBackdropPress={toggleDifficulty}
				animationType="fade"
			>
				<CrossDificulty
					setDifficulty={setDifficulty}
					difficulty={difficulty}
				/>
			</Overlay>
			<NewCubeAnimation
				cubeSize={3}
				key={animationKey}
				isPlaying={isPlaying}
				setIsPlaying={setIsPlaying}
				category={currentAlg.category}
				alg={scramble}
				currentAlg={currentAlg}
				scramble={0}
				edit={1}
				snap={1}
				onSuccessfulSolve={() => {
					setAnimationKey(animationKey + 1)
				}}
			/>
			<View style={styles.otherContainer}>
				<View style={{ alignItems: 'center' }}>
					<Text style={styles.algoText}>{scramble}</Text>
				</View>
			</View>
			<View style={[styles.buttonContainer]}>
				<TouchableButton
					onPress={toggleDifficulty}
					text="Change Difficulty"
				/>
				<TouchableButton
					onPress={() => {
						setAnimationKey(animationKey + 1)
					}}
					text="Another Scramble"
				/>
			</View>

			<View style={styles.buttonContainer}></View>

			<TouchableOpacity
				onPress={toggleOverlay}
				disabled={isPlaying}
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
