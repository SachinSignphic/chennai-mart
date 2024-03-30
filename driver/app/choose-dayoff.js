import { TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import OnboardingScreens from '@/components/OnboardingScreens'
import { Ionicons } from '@expo/vector-icons';
import RadioButton from '@/components/RadioButton';
import ProceedButton from '@/components/ProceedButton';

const DAYOFF = [
    {
        id: 1,
        title: "Monday",
        subtitle: "",
        // extraIcon: (selected) => <MaterialCommunityIcons name="clock-time-five-outline" size={40} color={selected ? "white" : "black"} />
    },
    {
        id: 2,
        title: "Tuesday",
        subtitle: "",
        // extraIcon: (selected) => <MaterialCommunityIcons name="clock-time-two-outline" size={40} color={selected ? "white" : "black"} />
    },
    {
        id: 3,
        title: "Thursday",
        subtitle: "",
        // extraIcon: (selected) => <MaterialCommunityIcons name="clock-time-six-outline" size={38} color={selected ? "white" : "black"} />
    },
    {
        id: 4,
        title: "Friday",
        subtitle: "",
        // extraIcon: (selected) => <MaterialCommunityIcons name="clock-time-six-outline" size={38} color={selected ? "white" : "black"} />
    },
]

const chooseDayoff = () => {
    const [selected, setSelected] = useState("");

    return (
        <OnboardingScreens>
            {
                DAYOFF.map(day => {
                    return <TouchableOpacity activeOpacity={0.8} key={day.id} className='w-full mb-4' onPress={() => setSelected(day.title)}>
                        <RadioButton
                            title={day.title}
                            selected={selected === day.title}
                            subtitle={day.subtitle}
                            icon={() => <Ionicons name="radio-button-off-sharp" size={30} color={selected === day.title ? "white" : "black"} />}
                            selectedIcon={() => <Ionicons name="checkmark-circle-outline" size={30} color={selected === day.title ? "white" : "black"} />}
                            //extraIcon={() => day.extraIcon(shift.title === selected)}
                        />
                    </TouchableOpacity>
                })
            }
            {
                selected !== "" && <ProceedButton autoMarginTop={true} innerText={'Continue'} routeName={'/upload-documents'} />
            }
        </OnboardingScreens>
    )
}

export default chooseDayoff