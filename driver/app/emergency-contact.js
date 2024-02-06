import { View, Text } from 'react-native'
import React from 'react'
import OnboardingScreens from '@/components/OnboardingScreens'
import TextInputLabel from '@/components/TextInputLabel'
import ProceedButton from '@/components/ProceedButton'

const emergencyContact = () => {
    return (
        <OnboardingScreens>
            <Text className='font-nunito-400 mt-[30%] mb-4 text-primary text-base w-full text-left px-1 modern:text-lg'>
                We will contact this person in case of any unavoidable situation.
            </Text>
            <View className='relative w-full'>
                <Text className='absolute left-3 top-[42.5%] font-nunito-400 text-primary text-lg modern:text-xl'>
                    +91 
                </Text>
                <TextInputLabel label={'Phone Number*'} isNumeric={true} paddingLeft={12} />
            </View>
            <ProceedButton innerText={'Continue'} autoMarginTop={true} routeName={'/documents-verified'} />
        </OnboardingScreens>
    )
}

export default emergencyContact