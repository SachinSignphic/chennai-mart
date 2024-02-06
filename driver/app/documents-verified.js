import { View, Text, Image } from 'react-native'
import React from 'react'
import OnboardingScreens from '@/components/OnboardingScreens'
import ProceedButton from '@/components/ProceedButton'

const documentsVerified = () => {
    return (
        <OnboardingScreens>
            <View className='flex-1 gap-y-6 px-6 justify-center items-center'>
                <Image source={require("@/assets/green-tick.png")} resizeMode='cover' className='w-36 h-36' />
                <Text className='text-primary text-lg modern:text-2xl text-center font-nunito-400'>Awesome! We’ve verified your documents!</Text>
                <Text className='text-primary/70 text-base modern:text-lg text-center font-nunito-400'>In the next steps you need to submit your Bank Details.</Text>
            </View>
            <ProceedButton autoMarginTop={true} innerText={"Continue"} routeName={'/bank-details'} />
        </OnboardingScreens>
    )
}

export default documentsVerified