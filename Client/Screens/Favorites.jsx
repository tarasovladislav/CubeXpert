import React, { useEffect, useState } from 'react'
import {
	ScrollView,
	FlatList,
	View,
	Text,
	StyleSheet,
	SafeAreaView,
} from 'react-native'

import SubsetElement from '../Components/SubsetElement'

import commonStyles from '../commonStyles'
import { useFavoritesContext } from '../Contexts/FavoritesContext'

const Favorites = ({ navigation }) => {
	const { favoritesList } = useFavoritesContext()
	const [groupedFavorites, setGroupedFavorites] = useState([])

	function groupAlgorithmsByCategory(algorithms) {
		const categories = {}

		algorithms.forEach((algo) => {
			const category = algo.category

			if (!categories[category]) {
				categories[category] = []
			}
			categories[category].push(algo)
		})
		const sortedCategories = Object.keys(categories).sort()

		return sortedCategories
			.map((categorytitle) => ({
				categorytitle,
				algoArray: categories[categorytitle],
			}))
			.sort()
	}

	useEffect(() => {
		setGroupedFavorites(groupAlgorithmsByCategory(favoritesList))
	}, [favoritesList])

	return (
		<>
			<ScrollView style={{ margin: 5 }}>
				{groupedFavorites.length ? (
					groupedFavorites.map((category) => {
						return (
							<View key={category.categorytitle}>
								<Text style={styles.categorytitle}>
									{category.categorytitle}
								</Text>
								<FlatList
									data={category.algoArray}
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
					})
				) : (
					<SafeAreaView
						style={{
							flex: 1,
							marginVertical: '50%',
							alignItems: 'center',
						}}
					>
						<Text style={{ fontSize: 20 }}>
							No favorite algorithms yet
						</Text>
					</SafeAreaView>
				)}
			</ScrollView>
		</>
	)
}

const styles = StyleSheet.create({
	categorytitle: {
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

export default Favorites
