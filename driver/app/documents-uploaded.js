import { View, Text, Image } from 'react-native'
import React from 'react'
import OnboardingScreens from '@/components/OnboardingScreens'
import ProceedButton from '@/components/ProceedButton'

const documentsUploaded = () => {
    return (
        <OnboardingScreens>
            <View className='flex-1 gap-y-6 justify-center items-center'>
                <Image source={require("@/assets/doc-done.png")} resizeMode='cover' className='w-36 h-36' />
                <Text className='text-primary text-lg modern:text-2xl font-nunito-400'>Thanks for all the details. We’re verifying your documents.</Text>
                <Text className='text-primary/70 text-base modern:text-lg font-nunito-400'>Don’t worry, We’ll notify you in few hours.</Text>
            </View>
            <ProceedButton autoMarginTop={true} innerText={"Continue"} routeName={'/address'} /> 
        </OnboardingScreens>
    )
}

export default documentsUploaded