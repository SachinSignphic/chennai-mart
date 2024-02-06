import { View, Text, TextInput } from 'react-native'
import React from 'react'

const TextInputLabel = ({ label, isNumeric, paddingLeft, isPassword }) => {
    return (
        <View className='flex w-full flex-col'>
            <Text className='text-primary mb-2 px-1 font-nunito-400 text-base modern:text-lg'>
                {label}
            </Text>
            <TextInput inputMode={isNumeric ? 'numeric' : 'text'} secureTextEntry={isPassword} className={`w-full mb-6 rounded-lg p-4 bg-secondary/10 ${paddingLeft ? 'px-12' : ''} text-lg modern:text-xl font-nunito-400 text-primary`} />
        </View>
    )
}

export default TextInputLabel