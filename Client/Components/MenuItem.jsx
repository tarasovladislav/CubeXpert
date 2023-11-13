import React from 'react'
import { StyleSheet, TouchableOpacity, Text, Image } from 'react-native'

const MenuItem = ({ onPress = () => { }, text, disabled = false, activeColor = '#ddd', disabledColor = '#eee' }) => {
    const styles = getDynamicStyles(activeColor, disabledColor);

    return (




        <TouchableOpacity disabled={disabled} style={!disabled ? styles.controlBtn : { ...styles.controlBtn, ...styles.controlBtnDisabled }} onPress={onPress} >
           
            <Text style={styles.buttonText}>{text}</Text>



        </TouchableOpacity>
    )
}
const getDynamicStyles = (activeColor, disabledColor) =>
    StyleSheet.create({
        controlBtn: {
            flex: 1,
            backgroundColor: activeColor,
            borderRadius: 5,
            margin: 5,
            justifyContent: 'center',
            flexDirection: 'row',
            height: 50
        },
        controlBtnDisabled: {
            backgroundColor: disabledColor
        },
        buttonText: {
            padding: 10,
            alignSelf: 'center',
        }
    })

export default MenuItem