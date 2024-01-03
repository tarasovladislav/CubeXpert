import React from 'react'
import { render, fireEvent } from '@testing-library/react-native'
import CubeSizePicker from '../Components/CubeSizePicker'
import { RotateTheCubeContextProvider } from '../Contexts/RotateTheCubeContext'
import commonStyles from '../commonStyles'

function getHostParent(element) {
	let result = element.parent
	while (typeof result.type !== 'string') {
		result = result.parent
	}

	return result
}

describe('CubeSizePicker', () => {
	test('renders correctly', () => {
		const { getByText } = render(
			<RotateTheCubeContextProvider>
				<CubeSizePicker />
			</RotateTheCubeContextProvider>
		)

		expect(getByText('Choose Cube Size')).toBeTruthy()
		expect(getByText('2x2x2')).toBeTruthy()
		expect(getByText('3x3x3')).toBeTruthy()
		expect(getByText('4x4x4')).toBeTruthy()
		expect(getByText('5x5x5')).toBeTruthy()
		expect(getByText('6x6x6')).toBeTruthy()
		expect(getByText('7x7x7')).toBeTruthy()
	})

	test('changes cube size on button press', () => {
		const { getByText } = render(
			<RotateTheCubeContextProvider>
				<CubeSizePicker />
			</RotateTheCubeContextProvider>
		)

		fireEvent.press(getByText('2x2x2'))
		expect(
			getHostParent(getByText('2x2x2')).props.style.backgroundColor
		).toBe(commonStyles.buttonActiveColor)

		fireEvent.press(getByText('3x3x3'))
		expect(
			getHostParent(getByText('3x3x3')).props.style.backgroundColor
		).toBe(commonStyles.buttonActiveColor)

		fireEvent.press(getByText('4x4x4'))
		expect(
			getHostParent(getByText('4x4x4')).props.style.backgroundColor
		).toBe(commonStyles.buttonActiveColor)

		fireEvent.press(getByText('5x5x5'))
		expect(
			getHostParent(getByText('5x5x5')).props.style.backgroundColor
		).toBe(commonStyles.buttonActiveColor)

		fireEvent.press(getByText('6x6x6'))
		expect(
			getHostParent(getByText('6x6x6')).props.style.backgroundColor
		).toBe(commonStyles.buttonActiveColor)

		fireEvent.press(getByText('7x7x7'))
		expect(
			getHostParent(getByText('7x7x7')).props.style.backgroundColor
		).toBe(commonStyles.buttonActiveColor)
	})
})
