import React, { useEffect, useState } from 'react'
import { SafeAreaView, StyleSheet, View, TouchableOpacity } from 'react-native'
import { Overlay } from 'react-native-elements'
import ProfileSettings from '../Components/ProfileSettings'

import NewCubeAnimation from '../Components/NewCubeAnimation'
import TouchableButton from '../Components/TouchableButton'
import Loading from '../Components/Loading'
const RotateTheCube = ({route}) => {
	const { solution } = route.params


	

	const [isPlaying, setIsPlaying] = useState(false)


	const [currentAlg, setCurrentAlg] = useState()

	// Get algo details
	useEffect(() => {
		setIsLoading(true)
		setCurrentAlg({ algo: [solution], })
		setIsLoading(false)
	}, [])

	const [animationKey, setAnimationKey] = useState(0)

	const [isLoading, setIsLoading] = useState(true)



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
					<NewCubeAnimation
						cubeSize={3}
						key={animationKey}
						isPlaying={isPlaying}
						setIsPlaying={setIsPlaying}
						category={"Solution"}
						alg={solution}
						currentAlg={currentAlg}
						// scramble={2}
						edit={0}
						snap={0}
						// onSuccessfulSolve={() => {
                        //     setNewCubeScramble(true)
						// 	setAnimationKey(animationKey + 1)
						// }}
					/>
					
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
