import React, { useState, useEffect } from 'react'
import { SafeAreaView, ScrollView, Platform, Alert } from 'react-native'
import * as Device from 'expo-device'
import MenuItem from '../Components/MenuItem'
import apiService from '../apiService'
import * as Notifications from 'expo-notifications'
import AsyncStorage from '@react-native-async-storage/async-storage'
const Home = ({ navigation }) => {
	const [menuItems, setMenuItems] = useState([
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

	//ask for push notification permission
	useEffect(() => {
		const checkExpoPushToken = async () => {
			try {
				const expoPushToken =
					await AsyncStorage.getItem('expoPushToken')
				if (!expoPushToken) {
					const token = await registerForPushNotificationsAsync()
					if (token) {
						apiService.registerForPushNotifications(token)
						token &&
							(await AsyncStorage.setItem('expoPushToken', token))
					}
				}
			} catch (error) {
				console.error('Error checking Expo Push Token:', error)
			}
		}

		checkExpoPushToken()
	}, [])

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

async function registerForPushNotificationsAsync() {
	let token

	if (Platform.OS === 'android') {
		await Notifications.setNotificationChannelAsync('default', {
			name: 'default',
			importance: Notifications.AndroidImportance.MAX,
			vibrationPattern: [0, 250, 250, 250],
			lightColor: '#FF231F7C',
		})
	}

	if (Device.isDevice) {
		const { status: existingStatus } =
			await Notifications.getPermissionsAsync()
		let finalStatus = existingStatus
		if (existingStatus !== 'granted') {
			const { status } = await Notifications.requestPermissionsAsync()
			finalStatus = status
		}
		if (finalStatus !== 'granted') {
			Alert.alert('Failed to get push token for push notification!')
			return
		}
		token = (
			await Notifications.getExpoPushTokenAsync({
				projectId: 'fc5548a8-fd8b-440b-a3e0-064e880b2d9f',
			})
		).data
	} else {
		Alert.alert('Must use physical device for Push Notifications')
	}

	return token
}
