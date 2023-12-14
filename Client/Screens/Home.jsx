import React from 'react'
import { StyleSheet, Dimensions, SafeAreaView, ScrollView } from 'react-native'

import { Image } from 'react-native-elements'
import MenuItem from '../Components/MenuItem'
import { imageMapping } from '../assets/img'
import commonStyles from '../commonStyles'
const Home = ({ navigation }) => {
	return (
		<SafeAreaView style={{ flex: 1 }}>
			<ScrollView style={{ flex: 1, margin: 5 }}>
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

				<MenuItem
					text="Rotate The Cube"
					onPress={() => {
						navigation.navigate('RotateTheCube', {
							name: 'Rotate The Cube',
						})
					}}
				/>
			</ScrollView>
		</SafeAreaView>
	)
}

const width = Dimensions.get('window').width

const styles = StyleSheet.create({
	
})

export default Home
