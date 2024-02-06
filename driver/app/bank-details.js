import { View, Text, ScrollView } from 'react-native'
import React from 'react'
import OnboardingScreens from '@/components/OnboardingScreens'
import TextInputLabel from '@/components/TextInputLabel'
import ProceedButton from '@/components/ProceedButton'

const BANK_DETAILS = [
    {
        id: 1,
        label: 'Bank Account Number*',
        isNumeric: true
    },
    {
        id: 2,
        label: 'Re-enter Bank Account Number*',
        isNumeric: true,
        isPassword: true
    },
    {
        id: 3,
        label: 'Bank IFSC Code*',
    },
]

const bankDetails = () => {
    return (
        <OnboardingScreens>
            <ScrollView showsHorizontalScrollIndicator={false} showsVerticalScrollIndicator={false} className='flex-1 w-full'>
                <Text className='text-primary mt-16 w-full px-1 mb-6 font-nunito-400 text-base modern:text-lg'>
                    This is the account to which your payout will be debited
                </Text>
                {
                    BANK_DETAILS.map(bankDetail => <TextInputLabel label={bankDetail.label} isNumeric={bankDetail.isNumeric?? false} isPassword={bankDetail.isPassword ?? false} key={bankDetail.id} />)
                }
            </ScrollView>
            <ProceedButton innerText={'Continue'} autoMarginTop={true} routeName={'/dashboard'} />
        </OnboardingScreens>
    )
}

export default bankDetails