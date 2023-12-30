import React, { useState } from 'react'
import { SafeAreaView, ScrollView, View } from 'react-native'
import MenuItem from '../Components/MenuItem'

const Home = ({ navigation }) => {
	const [menuItems, setMenuItems] = useState([
		{
			text: 'Cube Solver',
			navigateTo: 'CubeSolver',
			image: 'cubesolver',
		},
		{
			text: 'Beginners',
			navigateTo: 'Beginners Lessons',
			image: 'beginner',
		},
		{ text: 'Advanced', navigateTo: 'Choose Category', image: 'advanced' },
		{
			text: 'Patterns',
			navigateTo: 'Category',
			image: 'patterns',
			name: 'Patterns',
			category: 'Patterns',
		},
		{
			text: 'Favorites',
			navigateTo: 'Favorites',
			image: 'favorite',
			name: 'Favorites',
			category: 'Patterns',
		},
		{
			text: 'Rotate The Cube',
			navigateTo: 'RotateTheCube',
			image: 'rotate',
			name: 'Rotate The Cube',
		},
	])

	return (
		<SafeAreaView style={{ flex: 1 }}>
			<ScrollView style={{ flex: 1, margin: 5 }}>
				{menuItems.map((item, index) => (
					<MenuItem
						text={item.text}
						onPress={() => {
							navigation.navigate(item.navigateTo, {
								name: item.name,
								category: item.category,
							})
						}}
						image={item.image}
						key={index}
						timeout={index * 100}
					/>
				))}
			</ScrollView>
		</SafeAreaView>
	)
}

export default Home
