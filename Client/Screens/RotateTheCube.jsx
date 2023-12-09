import React, { useEffect, useState } from 'react'
import {
	SafeAreaView,
	StyleSheet,
	View,
	Text,
	TouchableOpacity,
} from 'react-native'
// import { Image } from 'react-native-elements';
import { Button, Overlay } from 'react-native-elements'
// import {Picker} from '@react-native-picker/picker';
import { Picker, DatePicker } from 'react-native-wheel-pick'

import apiService from '../apiService'
import ProfileSettings from '../Components/ProfileSettings'
import CubeAnimation from '../Components/CubeAnimation'
import NewCubeAnimation from '../Components/NewCubeAnimation'
import TouchableButton from '../Components/TouchableButton'
import Loading from '../Components/Loading'
import IconAwesome from 'react-native-vector-icons/FontAwesome5'
import CubeSizePicker from '../Components/CubeSizePicker'

const RotateTheCube = ({ route }) => {
	const _id = route?.params?._id

	const [isPlaying, setIsPlaying] = useState(false)

	const [visible, setVisible] = useState(false)
	const toggleOverlay = () => setVisible(!visible)

	const [currentAlg, setCurrentAlg] = useState()
	const [whichAlg, setWhichAlg] = useState(0)

	// Get algo details
	useEffect(() => {
		setIsLoading(true)
		// apiService.getAlgo(_id).then(data => setCurrentAlg(data)).then(data => {
		// }).finally(() => setIsLoading(false))
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
					{/* <View style={{ flexDirection: 'row', justifyContent: 'center', position: 'absolute', left: 0, top: 12, width: 70, zIndex: 2 }}>
                    <Text style={{ fontSize: 20, fontWeight: 800 }}>{whichAlg + 1} / {currentAlg.algo.length}</Text>
                </View> */}

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
