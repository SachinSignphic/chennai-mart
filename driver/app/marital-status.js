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

const jobtype = () => {
    const [selected, setSelected] = useState("");

    return (
        <OnboardingScreens>
            {
                MARITAL_STATUSES.map(jobType => {
                    return <TouchableOpacity activeOpacity={0.8} key={jobType.id} className='w-full mb-4' onPress={() => setSelected(jobType.title)}>
                        <RadioButton title={jobType.title} selected={selected === jobType.title} subtitle={jobType.subtitle} icon={() => <Ionicons name="radio-button-off-sharp" size={30} color={selected === jobType.title ? "white" : "black"} />} selectedIcon={() => <Ionicons name="checkmark-circle-outline" size={30} color={selected === jobType.title ? "white" : "black"} />} />
                    </TouchableOpacity>
                })
            }
            {
                selected !== "" && <ProceedButton autoMarginTop={true} innerText={'Continue'} />
            }
        </OnboardingScreens>
    )
}

export default jobtype