import React, { useEffect, useState } from 'react'
import {
	SafeAreaView,
	StyleSheet,
	View,
	Text,
	TouchableOpacity,
} from 'react-native'
import { Overlay } from 'react-native-elements'
import AsyncStorage from '@react-native-async-storage/async-storage'

import IconAwesome from 'react-native-vector-icons/FontAwesome5'

import ProfileSettings from '../Components/ProfileSettings'
import CubeAnimation from '../Components/CubeAnimation'
import NewCubeAnimation from '../Components/NewCubeAnimation'
import TouchableButtonTooltip from '../Components/TouchableButtonTooltip'
import Loading from '../Components/Loading'

import apiService from '../apiService'

const AlgoPage = ({ route }) => {
	const { _id } = route.params

	const [visible, setVisible] = useState(false)
	const toggleOverlay = () => setVisible(!visible)

	const [currentAlg, setCurrentAlg] = useState()
	const [whichAlg, setWhichAlg] = useState(0)

	// Get algo details
	useEffect(() => {
		setIsLoading(true)
		const storageKey = `algo_${_id}`

		const fetchData = async () => {
			const fetchedData = await apiService.getAlgo(_id)
			setCurrentAlg(fetchedData)
			AsyncStorage.setItem(storageKey, JSON.stringify(fetchedData))
			setIsLoading(false)
		}

		AsyncStorage.getItem(storageKey).then((storedData) => {
			if (storedData) {
				setCurrentAlg(JSON.parse(storedData))
				setIsLoading(false)
			} else {
				fetchData()
			}
		})
	}, [])

	const [isLoading, setIsLoading] = useState(true)
	if (isLoading) {
		return <Loading />
	}

	return (
		<>
			{currentAlg && (
				<SafeAreaView style={{ flex: 1 }}>
					<View
						style={{
							flexDirection: 'row',
							justifyContent: 'center',
							position: 'absolute',
							left: 0,
							top: 12,
							width: 70,
							zIndex: 2,
						}}
					>
						<Text style={{ fontSize: 20, fontWeight: '800' }}>
							{whichAlg + 1} / {currentAlg.algo.length}
						</Text>
					</View>

					<Overlay
						isVisible={visible}
						onBackdropPress={toggleOverlay}
						animationType="fade"
					>
						<ProfileSettings />
					</Overlay>

					{currentAlg.category === 'Beginners' ? (
						<CubeAnimation
							category={currentAlg.category}
							alg={currentAlg.algo[whichAlg]}
							currentAlg={currentAlg}
						/>
					) : (
						<NewCubeAnimation
							category={currentAlg.category}
							alg={currentAlg.algo[whichAlg]}
							currentAlg={currentAlg}
						/>
					)}

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

					{currentAlg.algo.length > 1 && (
						<View
							style={{
								flexDirection: 'row',
								position: 'relative',
							}}
						>
							<TouchableButtonTooltip
								disabled={whichAlg === 0}
								onPress={() => setWhichAlg(whichAlg - 1)}
								text="Previous"
							/>
							<TouchableButtonTooltip
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

const styles = StyleSheet.create({})

export default AlgoPage
