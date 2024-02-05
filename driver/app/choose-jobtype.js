import { TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import OnboardingScreens from '@/components/OnboardingScreens'
import { Ionicons } from '@expo/vector-icons';
import RadioButton from '@/components/RadioButton';
import ProceedButton from '@/components/ProceedButton';

const JOB_TYPES = [
    {
        id: 1, 
        title: "Full-Time",
        subtitle: "9 hours day job"
    },
    {
        id: 2, 
        title: "Part-Time",
        subtitle: "4-5 hours a day"
    },
]

const jobtype = () => {
    const [selected, setSelected] = useState("");

    return (
        <OnboardingScreens>
            {
                JOB_TYPES.map(jobType => {
                    return <TouchableOpacity activeOpacity={0.8} key={jobType.id} className='w-full mb-4' onPress={() => setSelected(jobType.title)}>
                        <RadioButton title={jobType.title} selected={selected === jobType.title} subtitle={jobType.subtitle} icon={() => <Ionicons name="radio-button-off-sharp" size={30} color={selected === jobType.title? "white": "black"} />} selectedIcon={() => <Ionicons name="checkmark-circle-outline" size={30} color={selected === jobType.title? "white": "black"} />} />
                    </TouchableOpacity>
                })
            }
            {
                selected !== "" && <ProceedButton autoMarginTop={true} innerText={'Continue'} routeName={'/marital-status'} />
            }
        </OnboardingScreens>
    )
}

export default jobtype