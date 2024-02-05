import { TouchableOpacity, Text } from 'react-native'
import React from 'react'
import { router } from 'expo-router'

const ProceedButton = ({ routeName, innerText, autoMarginTop }) => {
    return (
        <TouchableOpacity className={`w-full rounded-md mb-6 ${autoMarginTop? 'mt-auto': ''} py-4 flex items-center bg-primary`} activeOpacity={0.8}
            onPress={() => router.push(routeName)}
        >
            <Text className='text-teal font-nunito-800 text-md modern:text-xl'>{innerText}</Text>
        </TouchableOpacity>
    )
}

export default ProceedButton