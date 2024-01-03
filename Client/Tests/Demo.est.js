// import React from 'react'
// import { waitFor, render } from '@testing-library/react-native'
// import Demo from '../Components/Demo'
// import { SettingsContextProvider } from '../Contexts/SettingsContext'

// describe('Demo component', () => {
// 	it('renders without crashing', () => {
// 		render(
// 			<SettingsContextProvider>
// 				<Demo />
// 			</SettingsContextProvider>
// 		)
// 	})

// 	it('displays loading overlay when cube is loading', async () => {
// 		const { getByTestId } = render(
// 			<SettingsContextProvider>
// 				<Demo />
// 			</SettingsContextProvider>
// 		)
// 		const loadingOverlay = getByTestId('loading-overlay')
// 		expect(loadingOverlay).toBeTruthy()

// 		await waitFor(() => {
// 			expect(loadingOverlay).not.toBeVisible()
// 		})
// 	})

// 	it('displays webview when cube is loaded', async () => {
// 		const { getByTestId } = render(
// 			<SettingsContextProvider>
// 				<Demo />
// 			</SettingsContextProvider>
// 		)
// 		const webview = getByTestId('webview')
// 		expect(webview).not.toBeVisible()

// 		await waitFor(() => {
// 			expect(webview).toBeVisible()
// 		})
// 	})
// })
