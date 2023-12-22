import React, { useState, useEffect, useCallback } from 'react'
import {
	TouchableOpacity,
	View,
	Text,
	ScrollView,
	StyleSheet,
	Dimensions,
	SafeAreaView,
	RefreshControl,
} from 'react-native'
import { Image } from 'react-native-elements'
import { imageMapping } from '../assets/img/'
import apiService from '../apiService'
import Loading from '../Components/Loading'
import commonStyles from '../commonStyles'
import AsyncStorage from '@react-native-async-storage/async-storage'

const BeginnersLessonChoice = ({ navigation }) => {
	const [lessonsList, setLessonsList] = useState([])

	useEffect(() => {
		setIsLoading(true)
		AsyncStorage.getItem('lessonsList').then((cachedData) => {
			if (cachedData) {
				setLessonsList(JSON.parse(cachedData))
				setIsLoading(false)
			} else {
				apiService
					.getAllLessons()
					.then((data) => {
						setLessonsList(data)
						AsyncStorage.setItem(
							'lessonsList',
							JSON.stringify(data)
						)
					})
					.catch((error) => {
						console.error(error)
					})
					.finally(() => setIsLoading(false))
			}
		})
	}, [])
	const [refreshing, setRefreshing] = useState(false)
	const onRefresh = useCallback(() => {
		setRefreshing(true)
		AsyncStorage.removeItem('lessonsList').then(() => {
			apiService
				.getAllLessons()
				.then((data) => {
					setLessonsList(data)
					AsyncStorage.setItem('lessonsList', JSON.stringify(data))
				})
				.catch((error) => {
					console.error(error)
				})
				.finally(() => setRefreshing(false))
		})
	}, [])

	const [isLoading, setIsLoading] = useState(true)
	if (isLoading) {
		return <Loading />
	}
	return (
		<SafeAreaView>
			<ScrollView
				style={{ paddingVertical: 5, marginBottom: 5 }}
				refreshControl={
					<RefreshControl
						refreshing={refreshing}
						onRefresh={onRefresh}
					/>
				}
			>
				{lessonsList &&
					lessonsList.map((lesson) => (
						<View
							style={commonStyles.container}
							key={lesson.stepTitle}
						>
							<TouchableOpacity
								style={{
									flexDirection: 'row',
									alignItems: 'center',
									gap: 20,
									margin: 10,
									width: '100%',
								}}
								onPress={() =>
									navigation.navigate('Lesson', {
										name: lesson.stepTitle,
										data: lesson,
									})
								}
							>
								<Image
									style={styles.image}
									source={
										imageMapping[
											`${lesson.to.toLowerCase()}`
										]
									}
									resizeMode="contain"
									transition={true}
								/>

								<Text style={styles.header}>
									{lesson.stepTitle}
								</Text>
							</TouchableOpacity>
						</View>
					))}
			</ScrollView>
		</SafeAreaView>
	)
}

const width = Dimensions.get('window').width

const styles = StyleSheet.create({
	image: {
		width: width / 5,
		height: width / 5,
	},
	header: {
		fontSize: 22,
		fontWeight: '600',
		color: commonStyles.buttonColor,
	},
})
export default BeginnersLessonChoice
