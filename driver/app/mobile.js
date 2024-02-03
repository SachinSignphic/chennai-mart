import { View, Text } from 'react-native'
import React from 'react'
import { SafeAreaProvider } from 'react-native-safe-area-context'

const mobile = () => {
    return (
        <SafeAreaProvider>
            <Text>mobile</Text>
        </SafeAreaProvider>
    )
}

export default mobile