import React, { createContext, useContext, useEffect, useState } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'

const SettingsContext = createContext()

const SettingsContextProvider = ({ children }) => {
	const [webViewKey, setWebViewKey] = useState(1)

	const defaultSettings = {
		U: '#efcc00',
		F: '#E84855',
		R: '#386641',
		L: '#3185FC',
		B: '#ff7f00',
		D: '#F7F9F9',
		cube: '#000000',
		ignored: '#454445',
		speed: '500',
	}

	const [settings, setSettings] = useState({ ...defaultSettings })

	useEffect(() => {
		AsyncStorage.getItem('settings')
			.then((savedSettings) => {
				savedSettings && setSettings(JSON.parse(savedSettings))
			})
			.catch((error) => {
				console.error('Error retrieving settings: ', error)
			})
	}, [])

	useEffect(() => {
		const settingsJson = JSON.stringify(settings)
		AsyncStorage.setItem('settings', settingsJson)
			.then(() => {
				// console.log('Settings updated in LocalStorage')
			})
			.catch((error) => {
				console.log(error)
			})
	}, [settings])

	return (
		<SettingsContext.Provider
			value={{
				settings,
				setSettings,
				webViewKey,
				setWebViewKey,
				defaultSettings,
			}}
		>
			{children}
		</SettingsContext.Provider>
	)
}

const useSettingsContext = () => {
	return useContext(SettingsContext)
}

export { SettingsContextProvider, useSettingsContext }
