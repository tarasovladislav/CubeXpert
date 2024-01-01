import React, { useState, useEffect, useCallback } from 'react'

import {
	View,
	Text,
	FlatList,
	ScrollView,
	StyleSheet,
	Dimensions,
	Image,
	ActivityIndicator,
	SafeAreaView,
	RefreshControl,
} from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage'

import IconEntypo from 'react-native-vector-icons/Entypo'

import SubsetElement from '../Components/SubsetElement'
import Loading from '../Components/Loading'

import { imageMapping } from '../assets/img'
import commonStyles from '../commonStyles'
import apiService from '../apiService'

const LessonPage = ({ navigation, route }) => {
	const { data } = route.params

	const [algoData, setAlgoData] = useState([])

	useEffect(() => {
		setIsLoading(true)
		const encodedStepTitle = encodeURIComponent(data.stepTitle)
		const storageKey = `lessonPage_${encodedStepTitle}`

		const fetchData = async () => {
			const fetchedData = await Promise.all(
				data.data.map(async (element) => {
					if (element.type === 'algo') {
						const algoDataArray = await Promise.all(
							element.content.map(async (algoId) => {
								return await apiService.getAlgo(algoId)
							})
						)
						return algoDataArray
					} else {
						return []
					}
				})
			)
			setAlgoData(fetchedData)
			AsyncStorage.setItem(storageKey, JSON.stringify(fetchedData))
			setIsLoading(false)
		}

		AsyncStorage.getItem(storageKey).then((storedData) => {
			if (storedData) {
				setAlgoData(JSON.parse(storedData))
				setIsLoading(false)
			} else {
				fetchData()
			}
		})
	}, [])

	const [refreshing, setRefreshing] = useState(false)

	const onRefresh = useCallback(() => {
		setRefreshing(true)
		const encodedStepTitle = encodeURIComponent(data.stepTitle)
		const storageKey = `lessonPage_${encodedStepTitle}`
		AsyncStorage.removeItem(storageKey).then(() => {
			const fetchData = async () => {
				const fetchedData = await Promise.all(
					data.data.map(async (element) => {
						if (element.type === 'algo') {
							const algoDataArray = await Promise.all(
								element.content.map(async (algoId) => {
									return await apiService.getAlgo(algoId)
								})
							)
							return algoDataArray
						} else {
							return []
						}
					})
				)
				setAlgoData(fetchedData)
				AsyncStorage.setItem(storageKey, JSON.stringify(fetchedData))
				setRefreshing(false)
			}
			fetchData()
		})
	}, [])

	const imageFrom = imageMapping[`${data.from.toLowerCase()}`]
	const imageTo = imageMapping[`${data.to.toLowerCase()}`]

	const [isLoading, setIsLoading] = useState(true)

	return (
		<>
			<SafeAreaView>
				<ScrollView
					style={{ paddingVertical: 5 }}
					refreshControl={
						<RefreshControl
							refreshing={refreshing}
							onRefresh={onRefresh}
						/>
					}
				>
					<View style={commonStyles.container}>
						<Image
							PlaceholderContent={
								<ActivityIndicator size="large" />
							}
							resizeMode="contain"
							transition={true}
							source={imageFrom}
							style={styles.algoImage}
						/>
						<IconEntypo
							size={50}
							color="black"
							name="arrow-right"
							style={styles.bottomIcon}
						/>

						<Image
							PlaceholderContent={
								<ActivityIndicator size="large" />
							}
							resizeMode="contain"
							transition={true}
							source={imageTo}
							style={styles.algoImage}
						/>
					</View>
					{data.data.map((element, index) => {
						switch (element.type) {
							case 'paragraph':
								return (
									<Text
										key={element._id}
										style={styles.paragraph}
									>
										{element.content}
									</Text>
								)

							case 'algo':
								if (isLoading) {
									return <Loading key={element._id} />
								}
								return (
									<View
										key={element._id}
										style={
											data.data[index].content.length ===
											1
												? styles.aloneAlgo
												: { paddingHorizontal: 5 }
										}
									>
										<FlatList
											data={algoData[index]}
											numColumns={2}
											scrollEnabled={false}
											renderItem={({ item }) => (
												<SubsetElement
													navigation={navigation}
													algo={item}
												/>
											)}
											keyExtractor={(alg) => alg._id}
										/>
									</View>
								)

							case 'image':
								return (
									<View
										key={element._id}
										style={{
											flexDirection: 'row',
											justifyContent: 'center',
										}}
									>
										{element.content.map((image, index) => {
											return (
												<View
													key={index}
													style={[
														commonStyles.container,
														{
															padding: 5,
															margin: 5,
														},
													]}
												>
													<Image
														PlaceholderContent={
															<ActivityIndicator size="large" />
														}
														resizeMode="contain"
														transition={true}
														source={
															imageMapping[image]
														}
														style={
															element.content
																.length === 2
																? styles.algoImage
																: styles.algoImage2
														}
														key={`${element._id}.${index}`}
													/>
												</View>
											)
										})}
									</View>
								)

							case 'note':
								return (
									<Text key={element._id} style={styles.note}>
										<Text style={{ fontWeight: 'bold' }}>
											Note:
										</Text>{' '}
										{element.content}
									</Text>
								)

							default:
								break
						}
					})}
				</ScrollView>
			</SafeAreaView>
		</>
	)
}
const width = Dimensions.get('window').width

const styles = StyleSheet.create({
	note: {
		marginHorizontal: 10,
		marginBottom: 10,
		textAlign: 'center',
	},
	paragraph: {
		fontSize: 16,
		margin: 10,
		textAlign: 'justify',
	},
	algoImage: {
		width: width / 3,
		height: width / 3,
		margin: 10,
	},
	algoImage2: {
		width: width / 3.8,
		height: width / 3.8,
	},
	aloneAlgo: {
		flex: 1,
		width: '100%',
		position: 'relative',
		left: '25%',
	},
})

export default LessonPage
