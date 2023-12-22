import React, { useState, useEffect, useCallback } from 'react'
import { ScrollView, SafeAreaView, RefreshControl } from 'react-native'

import apiService from '../apiService'
import Loading from '../Components/Loading'
import AsyncStorage from '@react-native-async-storage/async-storage'
import LessonMenuItem from '../Components/LessonMenuItem'

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
					lessonsList.map((lesson, index) => (
						<LessonMenuItem
							lesson={lesson}
							navigation={navigation}
							key={index}
							timeout={index * 100}
						/>
					))}
			</ScrollView>
		</SafeAreaView>
	)
}

export default BeginnersLessonChoice
