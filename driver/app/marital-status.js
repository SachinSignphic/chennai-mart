import { TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import OnboardingScreens from '@/components/OnboardingScreens'
import { Ionicons } from '@expo/vector-icons';
import RadioButton from '@/components/RadioButton';
import ProceedButton from '@/components/ProceedButton';

const MARITAL_STATUSES = [
    {
        id: 1,
        title: "Married",
        subtitle: ""
    },
    {
        id: 2,
        title: "Single",
        subtitle: ""
    },
]

const maritalStatus = () => {
    const [selected, setSelected] = useState("");

    return (
        <OnboardingScreens>
            {
                MARITAL_STATUSES.map(status => {
                    return <TouchableOpacity activeOpacity={0.8} key={status.id} className='w-full mb-4' onPress={() => setSelected(status.title)}>
                        <RadioButton title={status.title} selected={selected === status.title} subtitle={status.subtitle} icon={() => <Ionicons name="radio-button-off-sharp" size={30} color={selected === status.title ? "white" : "black"} />} selectedIcon={() => <Ionicons name="checkmark-circle-outline" size={30} color={selected === status.title ? "white" : "black"} />} />
                    </TouchableOpacity>
                })
            }
            {
                selected !== "" && <ProceedButton autoMarginTop={true} innerText={'Continue'} routeName={'/choose-vehicle'} />
            }
        </OnboardingScreens>
    )
}

export default maritalStatus