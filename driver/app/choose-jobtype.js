import { ToastAndroid, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import OnboardingScreens from '@/components/OnboardingScreens'
import { Ionicons } from '@expo/vector-icons';
import RadioButton from '@/components/RadioButton';
import ProceedButton from '@/components/ProceedButton';
import AsyncStorage from '@react-native-async-storage/async-storage';

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

    const handleJobTypeSelection = async (jobType) => {
        try {
            await AsyncStorage.setItem("job-type", jobType);
            setSelected(jobType);
        } catch (error) {
            console.log("jobtype", error);
            ToastAndroid.show("Error in saving data. Please contact help from website", ToastAndroid.LONG);
        }
    }

    return (
        <OnboardingScreens>
            {
                JOB_TYPES.map(jobType => {
                    return <TouchableOpacity activeOpacity={0.8} key={jobType.id} className='w-full mb-4' onPress={() => handleJobTypeSelection(jobType.title)}>
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