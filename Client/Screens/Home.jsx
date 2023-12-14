import React from 'react'
import { StyleSheet, Dimensions, SafeAreaView, ScrollView } from 'react-native'
import MenuItem from '../Components/MenuItem'
const Home = ({ navigation }) => {
	return (
		<SafeAreaView style={{ flex: 1 }}>
			<ScrollView style={{ flex: 1, margin: 5 }}>
				<MenuItem
					text="Beginners"
					onPress={() => {
						navigation.navigate('Beginners Lessons')
					}}
                    image="beginner"

				/>

				<MenuItem
					text="Advanced"
					onPress={() => {
						navigation.navigate('Choose Category')
					}}
                    image="advanced"

				/>

				<MenuItem
					text="Patterns"
					onPress={() => {
						navigation.navigate('Category', {
							name: 'Patterns',
							category: 'Patterns',
						})
					}}
                    image="patterns"
				/>

				<MenuItem
					text="Favorites"
					onPress={() => {
						navigation.navigate('Favorites', {
							name: 'Favorites',
							category: 'Patterns',
						})
					}}
                    image="favorite"
				/>

				<MenuItem
					text="Rotate The Cube"
					onPress={() => {
						navigation.navigate('RotateTheCube', {
							name: 'Rotate The Cube',
						})
					}}
                    image="rotate"
				/>
			</ScrollView>
		</SafeAreaView>
	)
}

const width = Dimensions.get('window').width

const styles = StyleSheet.create({
	
})

export default Home
