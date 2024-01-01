import React, { useState, useEffect, useCallback } from 'react'
import { ScrollView, SafeAreaView, RefreshControl } from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage'

import Subset from '../Components/Subset'
import Loading from '../Components/Loading'

import apiService from '../apiService'

const CategoryPage = ({ route, navigation }) => {
	const { category } = route.params

	const [subsetList, setSubsetList] = useState([])
	const [isLoading, setIsLoading] = useState(true)

	useEffect(() => {
		setIsLoading(true)
		const storageKey = `subsetList_${category}`
		AsyncStorage.getItem(storageKey).then((cachedData) => {
			if (cachedData) {
				setSubsetList(JSON.parse(cachedData))
				setIsLoading(false)
			} else {
				apiService
					.getSubsetList(category)
					.then((data) => {
						setSubsetList(data)
						AsyncStorage.setItem(storageKey, JSON.stringify(data))
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
		const storageKey = `subsetList_${category}`
		AsyncStorage.removeItem(storageKey).then(() => {
			apiService
				.getSubsetList(category)
				.then((data) => {
					setSubsetList(data)
					AsyncStorage.setItem(storageKey, JSON.stringify(data))
				})
				.catch((error) => {
					console.error(error)
				})
				.finally(() => {
					setRefreshAllSubsets(true)
					setRefreshing(false)
				})
		})
	}, [])

	const [refreshAllSubsets, setRefreshAllSubsets] = useState(false)

	if (isLoading) {
		return <Loading />
	}

	return (
		<SafeAreaView>
			<ScrollView
				style={{ padding: 5, marginBottom: 5 }}
				refreshControl={
					<RefreshControl
						refreshing={refreshing}
						onRefresh={onRefresh}
					/>
				}
			>
				{subsetList &&
					subsetList.map((subset) => (
						<Subset
							navigation={navigation}
							key={subset}
							category={category}
							subset={subset}
							refreshAllSubsets={refreshAllSubsets}
							setRefreshAllSubsets={setRefreshAllSubsets}
						/>
					))}
			</ScrollView>
		</SafeAreaView>
	)
}

export default CategoryPage
