import React, { useState, useEffect, useCallback } from 'react'
import { View, StyleSheet, FlatList, Text } from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage'

import SubsetElement from './SubsetElement'

import commonStyles from '../commonStyles'
import apiService from '../apiService'

const Subset = ({
	navigation,
	category,
	subset,
	refreshAllSubsets,
	setRefreshAllSubsets,
}) => {
	const [subsetAlgs, setSubsetAlgs] = useState([])

	useEffect(() => {
		const encodedSubset = encodeURIComponent(subset)

		const storageKey = `subsetAlgs_${category}_${encodedSubset}`
		AsyncStorage.getItem(storageKey).then((cachedData) => {
			if (cachedData) {
				setSubsetAlgs(JSON.parse(cachedData))
			} else {
				apiService
					.getSubsetAlgorithms(category, subset)
					.then((data) => {
						setSubsetAlgs(data)
						AsyncStorage.setItem(storageKey, JSON.stringify(data))
					})
					.catch((error) => {
						console.error(error)
					})
			}
		})
	}, [])
	useEffect(() => {
		if (refreshAllSubsets) {
			onRefresh()
			setRefreshAllSubsets(false)
		}
	}, [refreshAllSubsets])

	const onRefresh = useCallback(() => {
		const encodedSubset = encodeURIComponent(subset)
		const storageKey = `subsetAlgs_${category}_${encodedSubset}`
		AsyncStorage.removeItem(storageKey).then(() => {
			apiService
				.getSubsetAlgorithms(category, subset)
				.then((data) => {
					setSubsetAlgs(data)
					AsyncStorage.setItem(storageKey, JSON.stringify(data))
				})
				.catch((error) => {
					console.error(error)
				})
		})
	}, [])

	return (
		<>
			{subset && subsetAlgs && subsetAlgs.length > 0 && (
				<View>
					{subset !== 'Patterns' && (
						<Text style={styles.subsetTitle}>{subset}</Text>
					)}
					<FlatList
						data={subsetAlgs}
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
			)}
		</>
	)
}

const styles = StyleSheet.create({
	subsetTitle: {
		textAlign: 'center',
		fontSize: 24,
		fontWeight: 'bold',
		margin: 5,
		padding: 10,
		color: commonStyles.titleColor,
        textShadowColor: commonStyles.subsetTitleShadowColor, 
		textShadowOffset: { width: 2, height: 2 }, 
		textShadowRadius: 1, 
	},
})

export default Subset
