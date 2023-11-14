import React from 'react'
import { ActivityIndicator, View, Text } from 'react-native'

const Loading = () => {
    return (
        <View style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center'
        }}>
            <ActivityIndicator size="large" />
        </View>
    )
}

export default Loading