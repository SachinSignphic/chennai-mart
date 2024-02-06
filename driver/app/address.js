import { View, Text, TextInput, ScrollView } from 'react-native'
import React from 'react'
import OnboardingScreens from '@/components/OnboardingScreens'
import TextInputLabel from '@/components/TextInputLabel'
import ProceedButton from '@/components/ProceedButton'

const ADDRESS_DETAILS = [
    {
        id: 1,
        label: 'Address Line 1*'
    },
    {
        id: 2,
        label: 'Address Line 2*'
    },
    {
        id: 3,
        label: 'State'
    },
    {
        id: 4,
        label: 'Pincode'
    },
]

const address = () => {
    return (
        <OnboardingScreens>
            <ScrollView showsHorizontalScrollIndicator={false} showsVerticalScrollIndicator={false} className='flex-1 w-full'>
                {
                    ADDRESS_DETAILS.map(addressDetail => <TextInputLabel key={addressDetail.id} label={addressDetail.label} isNumeric={addressDetail.label === "Pincode"} /> )
                }
            </ScrollView>
            <ProceedButton autoMarginTop={true} innerText={'Continue'} routeName={'/emergency-contact'} />
        </OnboardingScreens>
    )
}

export default address