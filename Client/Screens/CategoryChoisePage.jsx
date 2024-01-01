import React, { useState } from 'react'
import { ScrollView } from 'react-native'

import MenuItem from '../Components/MenuItem'

const CategoryChoisePage = ({ navigation, type }) => {
	const [categoryList, setCategoryList] = useState([
		{ title: 'First Two Layers', path: 'F2L', picturePath: 'F2L1' },
		{ title: 'Orient Last Layer', path: 'OLL', picturePath: 'OLL1' },
		{ title: 'Position Last Layer', path: 'PLL', picturePath: 'ua' },
	])

	return (
		<ScrollView style={{ paddingVertical: 5, marginBottom: 5 }}>
			<MenuItem
				onPress={() => navigation.navigate('CrossTrainer')}
				text={'Cross Trainer'}
				image={'crossto'}
				timeout={0 * 100}
				key={1}
			/>
			{categoryList &&
				categoryList.map((cat, index) => (
					<MenuItem
						onPress={() =>
							navigation.navigate('Category', {
								name: cat.title,
								category: cat.path,
							})
						}
						text={cat.title}
						image={cat.picturePath.toLowerCase()}
						timeout={(index + 1) * 100}
						key={index}
					/>
				))}
		</ScrollView>
	)
}

export default CategoryChoisePage
