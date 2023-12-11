import React, { useEffect, useState } from 'react'
import { SafeAreaView, StyleSheet, View, TouchableOpacity } from 'react-native'
import { Overlay } from 'react-native-elements'
import ProfileSettings from '../Components/ProfileSettings'
import NewCubeAnimation from '../Components/NewCubeAnimation'
import TouchableButton from '../Components/TouchableButton'
import Loading from '../Components/Loading'
import IconAwesome from 'react-native-vector-icons/FontAwesome5'
import CubeSizePicker from '../Components/CubeSizePicker'


//todo add posibility to watch how the cube solves? ??? ? ? ??  ? ??
// todo, make new route for rotating with button height 0
// todo, to main screen instead of random alg make cube which is rotating. 
const RotateTheCube = () => {
	const [isPlaying, setIsPlaying] = useState(false)

	const [visible, setVisible] = useState(false)
	const toggleOverlay = () => setVisible(!visible)

	const [currentAlg, setCurrentAlg] = useState()
	const [whichAlg, setWhichAlg] = useState(0)

	// Get algo details
	useEffect(() => {
		setIsLoading(true)
		setCurrentAlg({ algo: ['U'] })
		setIsLoading(false)
	}, [])
	const [animationKey, setAnimationKey] = useState(0)

	const [cubeSize, setCubeSize] = useState(3)
	const [isLoading, setIsLoading] = useState(true)

	const [cubeSizeVisible, setCubeSizeVisible] = useState(false)
	const toggleCubeSize = () => setCubeSizeVisible(!cubeSizeVisible)

	if (isLoading) {
		return <Loading />
	}

	return (
		<>
			{currentAlg && (
				<SafeAreaView style={{ flex: 1 }}>
					<Overlay
						isVisible={visible}
						onBackdropPress={toggleOverlay}
						animationType="fade"
					>
						<ProfileSettings />
					</Overlay>

					<Overlay
						isVisible={cubeSizeVisible}
						onBackdropPress={toggleCubeSize}
						animationType="fade"
					>
						<CubeSizePicker
							setCubeSize={setCubeSize}
							cubeSize={cubeSize}
						/>
					</Overlay>

					<NewCubeAnimation
						cubeSize={cubeSize}
						key={animationKey}
						isPlaying={isPlaying}
						setIsPlaying={setIsPlaying}
						category={currentAlg.category}
						alg={currentAlg.algo[whichAlg]}
						currentAlg={currentAlg}
						scramble={2}
					/>

					<View style={styles.buttonContainer}>
						<TouchableButton
							onPress={toggleCubeSize}
							text="Change Cube Size"
						/>
						<TouchableButton
							onPress={() => {
								setAnimationKey(animationKey + 1)
							}}
							text="Another scramble"
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

					{currentAlg.algo.length > 1 && (
						<View
							style={{
								flexDirection: 'row',
								position: 'relative',
							}}
						>
							<TouchableButton
								disabled={whichAlg === 0}
								onPress={() => setWhichAlg(whichAlg - 1)}
								text="Previous"
							/>
							<TouchableButton
								disabled={
									whichAlg === currentAlg.algo.length - 1
								}
								onPress={() => setWhichAlg(whichAlg + 1)}
								text="Next"
							/>
						</View>
					)}
				</SafeAreaView>
			)}
		</>
	)
}

const styles = StyleSheet.create({
	buttonContainer: {
		position: 'relative',
		flexDirection: 'row',
	},
})

export default RotateTheCube
