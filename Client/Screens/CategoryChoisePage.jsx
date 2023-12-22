import React, { useState, useEffect } from 'react'
import {
	TouchableOpacity,
	View,
	Text,
	StyleSheet,
	Dimensions,
    ScrollView,
} from 'react-native'
import { Image } from 'react-native-elements'
import { imageMapping } from '../assets/img/'
import commonStyles from '../commonStyles'
const CategoryChoisePage = ({ navigation, type }) => {
	const [categoryList, setCategoryList] = useState([
		{ title: 'First Two Layers', path: 'F2L', picturePath: 'F2L1' },
		{ title: 'Orient Last Layer', path: 'OLL', picturePath: 'OLL1' },
		{ title: 'Position Last Layer', path: 'PLL', picturePath: 'ua' },
	])

	return (
		<ScrollView style={{paddingVertical:5, marginBottom: 5}}>
			{categoryList &&
				categoryList.map((cat) => (
					<View style={commonStyles.container} key={cat.title}>
						<TouchableOpacity
							style={{
								flexDirection: 'row',
								alignItems: 'center',
								gap: 20,
								margin: 10,
								width: '100%',
                                
							}}
							onPress={() =>
								navigation.navigate('Category', {
									name: cat.title,
									category: cat.path,
								})
							}
						>
							<Image
								style={styles.image}
								source={
									imageMapping[
										`${cat.picturePath.toLowerCase()}`
									]
								}
								resizeMode="contain"
								transition={true}
							/>
							<Text style={styles.header}>{cat.title}</Text>
						</TouchableOpacity>
					</View>
				))}
		</ScrollView>
	)
}
const width = Dimensions.get('window').width

const styles = StyleSheet.create({
	image: {
		width: width / 4,
		height: width / 4,
	},
	header: {
		fontSize: 22,
		fontWeight: '600',
        color: commonStyles.buttonColor

	},
})

export default CategoryChoisePage
