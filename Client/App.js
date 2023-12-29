import AlgoPage from './Screens/AlgoPage'
import CategoryPage from './Screens/CategoryPage'
import CategoryChoisePage from './Screens/CategoryChoisePage'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { NavigationContainer } from '@react-navigation/native'
import Home from './Screens/Home'
import Landing from './Screens/Landing'
const Stack = createNativeStackNavigator()
import * as Updates from 'expo-updates'

import { SettingsContextProvider } from './Contexts/SettingsContext'
import { FavoritesContextProvider } from './Contexts/FavoritesContext'
import Favorites from './Screens/Favorites'
import BeginnersLessonChoice from './Screens/BeginnersLessonChoice'
import LessonPage from './Screens/LessonPage'
import commonStyles from './commonStyles'
import RotateTheCube from './Screens/RotateTheCube'
import { StatusBar, Platform } from 'react-native'

import React, { useEffect } from 'react'
import Constants from 'expo-constants'
import * as Notifications from 'expo-notifications'
import * as Device from 'expo-device'
import { Alert } from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage'
import apiService from './apiService'
import CrossTrainer from './Screens/CrossTrainer'
import CubeSolver from './Screens/CubeSolver'
import CubeSolverSolution from './Screens/CubeSolverSolution'

import { RotateTheCubeContextProvider } from './Contexts/RotateTheCubeContext'



export default function App() {
	const statusBarStyle = 'dark-content'
	useEffect(() => {
		async function onFetchUpdateAsync() {
			try {
				const update = await Updates.checkForUpdateAsync()

				if (update.isAvailable) {
					await Updates.fetchUpdateAsync()
					await Updates.reloadAsync()
				}
			} catch (error) {
				// You can also add an alert() to see the error message in case of an error when fetching updates.
				alert(`Error fetching latest Expo update: ${error}`)
			}
		}
		onFetchUpdateAsync()

		const checkExpoPushToken = async () => {
			try {
				// const expoPushToken =
				// 	await AsyncStorage.getItem('expoPushToken')
				// if (!expoPushToken) {
				const token = await registerForPushNotificationsAsync()
				if (token) {
					console.log('token', token)
					await apiService.registerForPushNotifications(token)
					token &&
						(await AsyncStorage.setItem('expoPushToken', token))
				}
				// }
			} catch (error) {
				console.error('Error checking Expo Push Token:', error)
			}
		}

		checkExpoPushToken()
	}, [])

	// useEffect(() => {
	//     async function onFetchUpdateAsync() {
	//     try {
	//       const update = await Updates.checkForUpdateAsync();

	//       if (update.isAvailable) {
	//         await Updates.fetchUpdateAsync();
	//         await Updates.reloadAsync();
	//       }
	//     } catch (error) {
	//       // You can also add an alert() to see the error message in case of an error when fetching updates.
	//       alert(`Error fetching latest Expo update: ${error}`);
	//     }
	//   }
	// onFetchUpdateAsync()
	// }, [])

	return (
		<NavigationContainer>
			<FavoritesContextProvider>
				<SettingsContextProvider>
					<RotateTheCubeContextProvider>
						<Stack.Navigator
							initialRouteName="Landing"
							screenOptions={{
								headerStyle: {
									backgroundColor:
										commonStyles.backgroundColor,
								},
								headerTintColor: commonStyles.titleColor,
								headerTitleStyle: {
									fontWeight: 'bold',
								},
								headerBackTitle: 'Back',
								contentStyle: {
									backgroundColor:
										commonStyles.backgroundColor,
								},
							}}
						>
							<Stack.Screen
								name="Landing"
								component={Landing}
								options={{ title: 'Home', headerShown: false }}
							/>
							<Stack.Screen
								name="Home"
								component={Home}
								options={{ title: 'Home' }}
							/>
							<Stack.Screen
								name="Choose Category"
								component={CategoryChoisePage}
								options={{
									title: 'Advanced Algorithms',
								}}
							/>
							<Stack.Screen
								name="Beginners Lessons"
								component={BeginnersLessonChoice}
								options={{
									title: 'Beginners Lessons',
								}}
							/>
							<Stack.Screen
								name="Lesson"
								component={LessonPage}
								options={({ route }) => ({
									title: route.params.name,
								})}
							/>
							<Stack.Screen
								name="Favorites"
								component={Favorites}
								options={({ route }) => ({
									title: route.params.name,
								})}
							/>
							<Stack.Screen
								name="Category"
								component={CategoryPage}
								options={({ route }) => ({
									title: route.params.name,
								})}
							/>
							<Stack.Screen
								name="Algo"
								component={AlgoPage}
								options={({ route }) => ({
									title: route.params.name,
								})}
							/>
							<Stack.Screen
								name="RotateTheCube"
								component={RotateTheCube}
								options={({ route }) => ({
									title: route.params.name,
								})}
							/>
							<Stack.Screen
								name="CrossTrainer"
								component={CrossTrainer}
								options={{
									title: 'Cross Trainer',
								}}
							/>
							<Stack.Screen
								name="CubeSolver"
								component={CubeSolver}
								options={{
									title: 'Cube Solver',
								}}
							/>
							<Stack.Screen
								name="CubeSolverSolution"
								component={CubeSolverSolution}
								options={{
									title: 'Solution',
								}}
							/>
						</Stack.Navigator>
					</RotateTheCubeContextProvider>
				</SettingsContextProvider>
			</FavoritesContextProvider>
			{Platform.OS === 'android' && (
				// <StatusBar barStyle={statusBarStyle} />
				<StatusBar />
			)}
			{/* {Platform.OS === 'ios' && <StatusBar barStyle={statusBarStyle} />} */}
			{Platform.OS === 'ios' && <StatusBar />}
		</NavigationContainer>
	)
}

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
				projectId: Constants.expoConfig.extra.eas.projectId,
			})
		).data
	} else {
		Alert.alert('Must use physical device for Push Notifications')
	}

	return token
}
