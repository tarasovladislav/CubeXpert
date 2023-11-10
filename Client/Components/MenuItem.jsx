import React from 'react'
import { StyleSheet, TouchableOpacity, Text, Image } from 'react-native'

const MenuItem = ({ onPress = () => { }, text, disabled = false, activeColor = '#ddd', disabledColor = '#eee' }) => {
    const styles = getDynamicStyles(activeColor, disabledColor);

    return (




        <TouchableOpacity disabled={disabled} style={!disabled ? styles.controlBtn : { ...styles.controlBtn, ...styles.controlBtnDisabled }} onPress={onPress} >
            <Image
                style={{
                    width: 40, height: 40, position: 'absolute', left: 0, margin: 5
                }}
                source={{ uri: `https://cubium-fe4h.vercel.app/img/f2l1.png` }}
                resizeMode="contain"
            />
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