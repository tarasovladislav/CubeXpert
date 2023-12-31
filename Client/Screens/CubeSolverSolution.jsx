import React, { useEffect, useState } from 'react'
import { SafeAreaView, StyleSheet, TouchableOpacity } from 'react-native'
import { Overlay } from 'react-native-elements'

import IconAwesome from 'react-native-vector-icons/FontAwesome5'

import ProfileSettings from '../Components/ProfileSettings'
import NewCubeAnimation from '../Components/NewCubeAnimation'
import Loading from '../Components/Loading'

const RotateTheCube = ({route}) => {
	const { solution } = route.params


    const [visible, setVisible] = useState(false)
	const toggleOverlay = () => setVisible(!visible)



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
						category={'Solution'}
						alg={solution}
						currentAlg={currentAlg}
						edit={0}
						snap={0}
						
					/>
					<TouchableOpacity
						onPress={toggleOverlay}
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
