import React, { useState, useEffect } from 'react'
import { View, StyleSheet, FlatList, Text } from 'react-native'
import apiService from '../apiService'
import SubsetElement from './SubsetElement'

const Subset = ({ navigation, category, subset }) => {
	const [subsetAlgs, setSubsetAlgs] = useState([])

	useEffect(() => {
		apiService
			.getSubsetAlgorithms(category, subset)
			.then((data) => setSubsetAlgs(data))
	}, [])

	return (
		<>
			{subset && subsetAlgs && subsetAlgs.length > 0 && (
				<View>
					{subset !== 'Patterns' && <Text style={styles.subsetTitle}>{subset}</Text>}
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
		// backgroundColor: '#ffffff',
		// shadowOffset: { width: 0, height: 2 },
		// shadowRadius: 2.22,
		// elevation: 3,
		// borderRadius: 8,
		// shadowOpacity: 0.23,
	},
})

export default Subset
