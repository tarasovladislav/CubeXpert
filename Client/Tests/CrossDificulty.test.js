import React from 'react'
import { render, fireEvent } from '@testing-library/react-native'
import CrossDificulty from '../Components/CrossDificulty'
import { SettingsContextProvider } from '../Contexts/SettingsContext'
import commonStyles from '../commonStyles'

function getHostParent(element) {
	let result = element.parent
	while (typeof result.type !== 'string') {
		result = result.parent
	}

	return result
}

describe('CrossDificulty', () => {
	test('renders correctly', () => {
		const { getByText } = render(
			<SettingsContextProvider>
				<CrossDificulty />
			</SettingsContextProvider>
		)

		expect(getByText('Choose Difficulty')).toBeTruthy()
		expect(getByText('1 move')).toBeTruthy()
		expect(getByText('2 moves')).toBeTruthy()
		expect(getByText('3 moves')).toBeTruthy()
		expect(getByText('4 moves')).toBeTruthy()
		expect(getByText('5 moves')).toBeTruthy()
		expect(getByText('6 moves')).toBeTruthy()
		expect(getByText('7 moves')).toBeTruthy()
		expect(getByText('8 moves')).toBeTruthy()
	})

	test('changes difficulty on button press', () => {
		const { getByText } = render(
			<SettingsContextProvider>
				<CrossDificulty />
			</SettingsContextProvider>
		)

		fireEvent.press(getByText('1 move'))

		expect(
			getHostParent(getByText('1 move')).props.style.backgroundColor
		).toBe(commonStyles.buttonActiveColor)

		fireEvent.press(getByText('3 moves'))
		expect(
			getHostParent(getByText('3 moves')).props.style.backgroundColor
		).toBe(commonStyles.buttonActiveColor)

		expect(
			getHostParent(getByText('2 moves')).props.style.backgroundColor
		).toBe(commonStyles.buttonDisabledColor)
	})
})
