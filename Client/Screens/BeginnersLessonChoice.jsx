import React, { useState, useEffect } from 'react'
import {
	TouchableOpacity,
	View,
	Text,
	ScrollView,
	StyleSheet,
	Dimensions,
	SafeAreaView,
} from 'react-native'
import { Image } from 'react-native-elements'
import { imageMapping } from '../assets/img/'
import apiService from '../apiService'
import Loading from '../Components/Loading'
import commonStyles from '../commonStyles'
const BeginnersLessonChoice = ({ navigation }) => {
	const [lessonsList, setLessonsList] = useState([])
	useEffect(() => {
		setIsLoading(true)
		apiService
			.getAllLessons()
			.then((data) => setLessonsList(data))
			.finally(() => setIsLoading(false))
	}, [])
	const [isLoading, setIsLoading] = useState(true)
	if (isLoading) {
		return <Loading />
	}
	return (
		<SafeAreaView>
			<ScrollView>
				{lessonsList &&
					lessonsList.map((lesson) => (
						<View
							style={commonStyles.container}
							key={lesson.stepTitle}
						>
							<TouchableOpacity
								style={{
									flexDirection: 'row',
									alignItems: 'center',
									gap: 20,
									margin: 10,
									width: '100%',
								}}
								onPress={() =>
									navigation.navigate('Lesson', {
										name: lesson.stepTitle,
										data: lesson,
									})
								}
							>
								<Image
									style={styles.image}
									source={
										imageMapping[
											`${lesson.to.toLowerCase()}`
										]
									}
									resizeMode="contain"
									transition={true}
								/>

								<Text style={styles.header}>
									{lesson.stepTitle}
								</Text>
							</TouchableOpacity>
						</View>
					))}
			</ScrollView>
		</SafeAreaView>
	)
}

const width = Dimensions.get('window').width

const styles = StyleSheet.create({
	image: {
		width: width / 5,
		height: width / 5,
	},
	header: {
		fontSize: 22,
        fontWeight: '600',
	},
})
export default BeginnersLessonChoice
