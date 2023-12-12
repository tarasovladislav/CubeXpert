import React, { useState, useEffect } from 'react'
import {
	View,
	Text,
	StyleSheet,
	Dimensions,
	ActivityIndicator,
	SafeAreaView,
	FlatListComponent,
} from 'react-native'
import { useFocusEffect } from '@react-navigation/native'

import { Image } from 'react-native-elements'
import Loading from '../Components/Loading'
import apiService from '../apiService'
import MenuItem from '../Components/MenuItem'
import { imageMapping } from '../assets/img'
import commonStyles from '../commonStyles'
import Demo from '../Components/Demo'
const Home = ({ navigation }) => {
	const [isLoading, setIsLoading] = useState(true)
	const [randomAlgo, setRandomAlgo] = useState()

	// useEffect(() => randomAlg(), [])
	const [isDemoCubeVisible, setIsDemoCubeVisible] = useState(false) // Set it to true initially

	const randomAlg = () => {
		setIsLoading(true)
		apiService
			.getRandomAlg()
			.then((data) => setRandomAlgo(data))
			.finally(() => setIsLoading(false))
	}
	useFocusEffect(() => {
		setIsLoading(false)
		setIsDemoCubeVisible(true) // Hide and unmount the Demo cube WebView

		return () => {
			setIsDemoCubeVisible(false)
		}
	})
	if (isLoading) {
		return <Loading />
	}

	return (
		<>
			<SafeAreaView style={[commonStyles.flex1]}>
				<View style={[{ flex: 7 }]}>
					<Text
						style={{
							fontSize: 34,
							textAlign: 'center',
							marginTop: 30,
							fontWeight: '600',
						}}

						// todo. add sme styles
					>
						CubeXpert
					</Text>
					{/* {randomAlgo && (
						<MenuItem
							onPress={() => {
								navigation.navigate('Algo', {
									_id: randomAlgo._id,
									name: randomAlgo.title,
								})
								setTimeout(() => randomAlg(), 500)
							}}
						>
							<Text style={styles.title}>Random Algorithm</Text>
							<View
								style={{
									alignItems: 'center',
									flex: 1,
									justifyContent: 'center',
								}}
							>
								<Image
									PlaceholderContent={
										<ActivityIndicator size="large" />
									}
									style={styles.cubeImage}
									source={
										imageMapping[
											`${randomAlgo.picturePath.toLowerCase()}`
										]
									}
									resizeMode="contain"
									transition={true}
								/>
							</View>
							<Text style={styles.firstAlgo}>
								{randomAlgo.algo[0]}
							</Text>
						</MenuItem>
					)} */}
					{isDemoCubeVisible && <Demo demo="zzUuzzd'D'UE'D'D'E'U" />}
				</View>
				<View style={[{ flex: 3 }]}>
					<View style={styles.buttonContainer}>
						<View style={styles.buttonRow}>
							<MenuItem
								text="Beginners"
								onPress={() => {
									navigation.navigate('Beginners Lessons')
								}}
							/>

							<MenuItem
								text="Advanced"
								onPress={() => {
									navigation.navigate('Choose Category')
								}}
							/>
						</View>

						<View style={styles.buttonRow}>
							<MenuItem
								text="Patterns"
								onPress={() => {
									navigation.navigate('Category', {
										name: 'Patterns',
										category: 'Patterns',
									})
								}}
							/>

							<MenuItem
								text="Favorites"
								onPress={() => {
									navigation.navigate('Favorites', {
										name: 'Favorites',
										category: 'Patterns',
									})
								}}
							/>
						</View>
						<View style={styles.buttonRow}>
							<MenuItem
								text="Rotate The Cube"
								onPress={() => {
									navigation.navigate('RotateTheCube', {
										name: 'Rotate The Cube',
									})
								}}
							/>
						</View>
					</View>
				</View>
			</SafeAreaView>
		</>
	)
}

const width = Dimensions.get('window').width

const styles = StyleSheet.create({
	cubeImage: {
		flex: 1,
		aspectRatio: 1,
		maxWidth: width - 100,
		maxHeight: width - 100,
		margin: 5,
	},
	buttonRow: {
		flexDirection: 'row',
		height: '33.33%',
	},
	buttonContainer: {
		flex: 1,
		paddingHorizontal: 5,

	},
	firstAlgo: {
		fontSize: 20,
		textAlign: 'center',
		maxWidth: '85%',
		marginBottom: 10,
		alignSelf: 'center',
	},
	title: {
		padding: 10,
		alignSelf: 'center',
		fontSize: 24,
		textAlign: 'center',
		fontWeight: 'bold',
	},
})

export default Home
