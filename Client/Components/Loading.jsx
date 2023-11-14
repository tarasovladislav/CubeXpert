import React from 'react'
import { ActivityIndicator, View } from 'react-native'
import commonStyles from '../commonStyles'
const Loading = () => {
    return (
        <View style={[commonStyles.flex1, commonStyles.cencen]}>
            <ActivityIndicator size="large" />
        </View>
    )
}

export default Loading