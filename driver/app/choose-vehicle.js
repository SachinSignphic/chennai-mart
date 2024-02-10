import { ToastAndroid, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import OnboardingScreens from '@/components/OnboardingScreens'
import { Ionicons } from '@expo/vector-icons';
import RadioButton from '@/components/RadioButton';
import ProceedButton from '@/components/ProceedButton';
import { FontAwesome } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { router } from 'expo-router';

const VEHICLES = [
    {
        id: 1,
        title: "Bike",
        subtitle: "",
        extraIcon: (selected) => <FontAwesome name="motorcycle" size={38} color={selected? "white": "black"} />
    },
    {
        id: 2,
        title: "E-Bike",
        subtitle: "",
        extraIcon: (selected) => <MaterialCommunityIcons name="motorbike-electric" size={40} color={selected? "white": "black"} />
    },
    {
        id: 3,
        title: "Cycle",
        subtitle: "",
        extraIcon: (selected) => <MaterialCommunityIcons name="bicycle-basket" size={38} color={selected ? "white" : "black"} />
    },
]

const chooseVehicle = () => {
    const [selected, setSelected] = useState("");

    const checkJobType = async () => {
        try {
            const jobType = await AsyncStorage.getItem("job-type");
            console.log("🚀 ~ checkJobType ~ jobType:", jobType)
            if (jobType === "Full-Time") router.push("/choose-dayoff")
            else router.push('/choose-shift')
        } catch (error) {
            console.log("jobtype", error);
            ToastAndroid.show("Error in saving data. Please contact help from website", ToastAndroid.LONG);
        }
    }

    return (
        <OnboardingScreens>
            {
                VEHICLES.map(vechicle => {
                    return <TouchableOpacity activeOpacity={0.8} key={vechicle.id} className='w-full mb-4' onPress={() => setSelected(vechicle.title)}>
                        <RadioButton 
                            title={vechicle.title} 
                            selected={selected === vechicle.title} 
                            subtitle={vechicle.subtitle} 
                            icon={() => <Ionicons name="radio-button-off-sharp" size={30} color={selected === vechicle.title ? "white" : "black"} />} 
                            selectedIcon={() => <Ionicons name="checkmark-circle-outline" size={30} color={selected === vechicle.title ? "white" : "black"} />} 
                            extraIcon={() => vechicle.extraIcon(vechicle.title === selected)}    
                        />
                    </TouchableOpacity>
                })
            }
            {
                selected !== "" && <ProceedButton autoMarginTop={true} innerText={'Continue'} action={checkJobType} />
            }
        </OnboardingScreens>
    )
}

export default chooseVehicle