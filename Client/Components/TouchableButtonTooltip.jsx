import React, { useState } from 'react'
import { StyleSheet, TouchableOpacity, Text } from 'react-native'
import { Tooltip } from '@rneui/themed'

import commonStyles from '../commonStyles'

const TouchableButtonTooltip = ({
	onPress = () => {},
	text,
	disabled = false,
	textColor = commonStyles.buttonColor,
	activeColor = commonStyles.buttonActiveColor,
	disabledColor = commonStyles.buttonDisabledColor,
	popover = '',
}) => {
	const styles = getDynamicStyles(activeColor, disabledColor, textColor)
	const [isTooltipVisible, setIsTooltipVisible] = useState(false)

	const toggleTooltip = () => {
		setIsTooltipVisible(!isTooltipVisible)
	}
	return (
		<>
			<TouchableOpacity
				disabled={disabled}
				style={
					!disabled
						? styles.controlBtn
						: { ...styles.controlBtn, ...styles.controlBtnDisabled }
				}
				onPress={onPress}
				onLongPress={toggleTooltip}
			>
				<Text style={styles.buttonText}>{text}</Text>
			</TouchableOpacity>
			{popover && (
				<Tooltip
					visible={isTooltipVisible}
					onClose={() => {
						setIsTooltipVisible(false)
					}}
					popover={<Text>{popover}</Text>}
					withPointer={false}
					backgroundColor={commonStyles.buttonDisabledColor}
				></Tooltip>
			)}
		</>
	)
}
const getDynamicStyles = (activeColor, disabledColor, textColor) =>
	StyleSheet.create({
		controlBtn: {
			flex: 1,
			backgroundColor: activeColor,
			borderRadius: 50,
			margin: 5,
			justifyContent: 'center',
			borderRadius: 50,
			backgroundColor: activeColor,
			shadowOffset: { width: 0, height: 2 },
			shadowOpacity: 0.23,
			shadowRadius: 2.22,
			elevation: 3,
		},
		controlBtnDisabled: {
			backgroundColor: disabledColor,
		},
		buttonText: {
			padding: 10,
			color: textColor,
			alignSelf: 'center',
		},
	})

export default TouchableButtonTooltip
