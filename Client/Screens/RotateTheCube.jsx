import React, { useState } from 'react'
import { SafeAreaView, StyleSheet, View, TouchableOpacity } from 'react-native'
import { Overlay } from 'react-native-elements'
import ProfileSettings from '../Components/ProfileSettings'
import NewCubeAnimation from '../Components/NewCubeAnimation'
import TouchableButton from '../Components/TouchableButton'
import IconAwesome from 'react-native-vector-icons/FontAwesome5'
import CubeSizePicker from '../Components/CubeSizePicker'
import { useRotateTheCubeContext } from '../Contexts/RotateTheCubeContext'
const RotateTheCube = () => {
	const {
		rotateTheCube,
		setNewCubeScramble,
		setCubeSaver,
		setRestoreCubeTrigger,
	} = useRotateTheCubeContext()

	const [settingsVisible, setSettingsVisible] = useState(false)
	const toggleSettingsVisible = () => setSettingsVisible(!settingsVisible)

	const [animationKey, setAnimationKey] = useState(0)

	const [cubeSizeVisible, setCubeSizeVisible] = useState(false)
	const toggleCubeSize = () => setCubeSizeVisible(!cubeSizeVisible)

	return (
		<SafeAreaView style={{ flex: 1 }}>
			<Overlay
				isVisible={cubeSizeVisible}
				onBackdropPress={toggleCubeSize}
				animationType="fade"
			>
				<CubeSizePicker />
			</Overlay>

			<NewCubeAnimation
				cubeSize={rotateTheCube.cubeSize}
				key={animationKey}
				category={'RotateTheCube'}
				scramble={2}
				edit={1}
				snap={1}
				onSuccessfulSolve={() => {
					setNewCubeScramble(true)
					setAnimationKey(animationKey + 1)
				}}
			/>
			<View style={[styles.buttonContainer]}>
				<TouchableButton
					onPress={() => setCubeSaver(true)}
					text="Save The Cube"
				/>
				<TouchableButton
					onPress={() => {
						setRestoreCubeTrigger(true)
					}}
					text="Restore The Cube"
				/>
			</View>
			<View style={[styles.buttonContainer]}>
				<TouchableButton
					onPress={toggleCubeSize}
					text="Change Cube Size"
				/>
				<TouchableButton
					onPress={() => {
						setNewCubeScramble(true)
						setAnimationKey(animationKey + 1)
					}}
					text="Another Scramble"
				/>
			</View>
			<View style={styles.buttonContainer}></View>

			<Overlay
				isVisible={settingsVisible}
				onBackdropPress={toggleSettingsVisible}
				animationType="fade"
			>
				<ProfileSettings />
			</Overlay>
			<TouchableOpacity
				onPress={toggleSettingsVisible}
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
})

export default RotateTheCube
