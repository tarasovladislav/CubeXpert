import React from 'react'
import { StyleSheet, TouchableOpacity, Text } from 'react-native'

const TouchableButton = ({ onPress = () => { }, text, disabled = false, textColor = '#000000', activeColor = '#839dd1', disabledColor = '#d3e2f2' }) => {
    const styles = getDynamicStyles(activeColor, disabledColor, textColor);

    return (
        <TouchableOpacity disabled={disabled} style={!disabled ? styles.controlBtn : { ...styles.controlBtn, ...styles.controlBtnDisabled }} onPress={onPress} >
            <Text style={styles.buttonText}>{text}</Text>
        </TouchableOpacity>
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
        }
    })

export default TouchableButton