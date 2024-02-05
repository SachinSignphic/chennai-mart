import { View, Text } from 'react-native'
import React from 'react'

const Divider = ({ text }) => {
    return (
        <View className='flex w-full flex-row gap-x-4 items-center justify-center mt-6'>
            <View className='flex flex-1 h-[1] bg-secondary/60'></View>
            {
                text && <>
                    <Text className='text-secondary/60 text-justify font-nunito-800 text-lg modern:text-xl'>{text}</Text>
                    <View className='flex flex-1 h-[1] bg-secondary/60'></View>
                </>
            }
        </View>
    )
}

export default Divider