import React, { useState, useEffect } from 'react';
import { Image, Text, View } from 'react-native';
import * as Location from 'expo-location';
import OnboardingScreens from '@/components/OnboardingScreens';

export default location = () => {
    const [location, setLocation] = useState(null);
    const [geoLocation, setGeoLocation] = useState(null)
    const [errorMsg, setErrorMsg] = useState(null);

    useEffect(() => {
        (async () => {
            let locationPermission = await Location.requestForegroundPermissionsAsync();
            // console.log("🚀 ~ locationPermission:", locationPermission)
            
            if (locationPermission.status !== 'granted') {
                setErrorMsg('Permission to access location was denied');
                return;
            }

            let location = await Location.getCurrentPositionAsync({});
            setLocation(location);
            let geo = await Location.reverseGeocodeAsync({latitude: location.coords.latitude, longitude: location.coords.longitude});
            // console.log("🚀 ~ cityName:", cityName)
            setGeoLocation(geo);
        })();
    }, []);

    let text = 'Waiting..';
    if (errorMsg) {
        text = errorMsg;
    } else if (location) {
        text = JSON.stringify(location);
    }

    return (
        <OnboardingScreens>
            <View className='bg-secondary/10 rounded-lg m-8 p-10 flex items-center justify-center'>
                <Image source={require("@/assets/entypo_location.png")} width={150} height={150} />
            </View>
            <Text className='text-secondary font-nunito-400 text-sm modern:text-base w-[70%] text-center'>We’ve auto detected your city. This is the city where you will work.</Text>

            {
                geoLocation && <Text className='text-primary font-nunito-400 text-lg mt-12 modern:text-xl w-[70%] text-center'>{geoLocation[0].city}</Text>
            }

        </OnboardingScreens>
    );
}