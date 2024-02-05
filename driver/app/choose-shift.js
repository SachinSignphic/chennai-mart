import { TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import OnboardingScreens from '@/components/OnboardingScreens'
import { Ionicons } from '@expo/vector-icons';
import RadioButton from '@/components/RadioButton';
import ProceedButton from '@/components/ProceedButton';
import { MaterialCommunityIcons } from '@expo/vector-icons';

const SHIFTS_AVAILABLE = [
    {
        id: 1,
        title: "Morning",
        subtitle: "5AM - 2PM",
        extraIcon: (selected) => <MaterialCommunityIcons name="clock-time-five-outline" size={40} color={selected ? "white" : "black"} />
    },
    {
        id: 2,
        title: "Afternoon",
        subtitle: "2PM - 2AM",
        extraIcon: (selected) => <MaterialCommunityIcons name="clock-time-two-outline" size={40} color={selected ? "white" : "black"} />
    },
    {
        id: 3,
        title: "Evening",
        subtitle: "6PM - 5AM",
        extraIcon: (selected) => <MaterialCommunityIcons name="clock-time-six-outline" size={38} color={selected ? "white" : "black"} />
    },
]

const chooseShift = () => {
    const [selected, setSelected] = useState("");

    return (
        <OnboardingScreens>
            {
                SHIFTS_AVAILABLE.map(shift => {
                    return <TouchableOpacity activeOpacity={0.8} key={shift.id} className='w-full mb-4' onPress={() => setSelected(shift.title)}>
                        <RadioButton
                            title={shift.title}
                            selected={selected === shift.title}
                            subtitle={shift.subtitle}
                            icon={() => <Ionicons name="radio-button-off-sharp" size={30} color={selected === shift.title ? "white" : "black"} />}
                            selectedIcon={() => <Ionicons name="checkmark-circle-outline" size={30} color={selected === shift.title ? "white" : "black"} />}
                            extraIcon={() => shift.extraIcon(shift.title === selected)}
                        />
                    </TouchableOpacity>
                })
            }
            {
                selected !== "" && <ProceedButton autoMarginTop={true} innerText={'Continue'} routeName={'/choose-dayoff'} />
            }
        </OnboardingScreens>
    )
}

export default chooseShift