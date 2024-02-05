import React, { useState, useEffect } from 'react';
import { ActivityIndicator, Image, Text, TouchableOpacity, View } from 'react-native';
import * as Location from 'expo-location';
import OnboardingScreens from '@/components/OnboardingScreens';
import { Link, useLocalSearchParams } from 'expo-router';
import ProceedButton from '@/components/ProceedButton';

export default location = () => {
    const [geoLocation, setGeoLocation] = useState(null)
    const [errorMsg, setErrorMsg] = useState(null);
    const { city } = useLocalSearchParams();
    console.log(city, geoLocation);

    useEffect(() => {
        const locateCity = async () => {
            let locationPermission = await Location.requestForegroundPermissionsAsync();
            console.log("🚀 ~ locationPermission:", locationPermission)
            
            if (locationPermission.status !== 'granted') {
                setErrorMsg('Location permission was denied. Please allow location permission to continue.');
                return;
            }

            setTimeout(() => {
                if (!geoLocation) setErrorMsg('Failed to detect location!')
            }, 1000 * 2);

            let loc = await Location.getCurrentPositionAsync({});
            console.log("🚀 ~ loc:", loc)
            let geo = await Location.reverseGeocodeAsync({ latitude: loc.coords?.latitude, longitude: loc.coords?.longitude });
            console.log("🚀 ~ geo:", geo)
            // console.log("🚀 ~ cityName:", cityName)
            setGeoLocation(geo);
        
        }

        if (!geoLocation && city) {
            setErrorMsg(null)
            setGeoLocation([{ city: city }])
            return
        }
        if (!geoLocation) locateCity();
    }, [city]);

    return (
        <OnboardingScreens>
            <View className='bg-secondary/10 rounded-lg m-8 p-10 flex items-center justify-center'>
                <Image source={require("@/assets/entypo_location.png")} width={150} height={150} />
            </View>
            {
                errorMsg? 
                    <>
                        <Text className='text-secondary font-nunito-400 text-sm modern:text-base w-[70%] text-center'>{errorMsg}</Text>
                        <Link href={'/choose-city'} className='underline'>
                            Choose city manually
                        </Link>
                    </>:
                    <>
                        {
                            !!geoLocation ? 
                            <>
                                <View className='gap-y-2 flex flex-col items-center w-full'>
                                    <Text className='text-secondary font-nunito-400 text-sm modern:text-base mb-6 w-[70%] text-center'>We’ve auto detected your city. This is the city where you will work.</Text>
                                    <Text className='text-primary font-nunito-400 text-lg modern:text-3xl w-[70%] text-center'>{geoLocation[0].city}</Text>
                                    <Text>OR</Text>
                                    <Link href={'/choose-city'} className='underline'>
                                        Choose city manually
                                    </Link>
                                </View>
                                <ProceedButton routeName={'/choose-jobtype'} autoMarginTop={true} innerText={"Proceed"} />
                            </>
                                    :
                                <>
                                    <Text className='text-secondary font-nunito-400 text-sm modern:text-base w-[70%] text-center'>We’re detecting your city</Text>
                                    <ActivityIndicator className='mt-8' size={40} />
                                </>
                        }
                    </>
            }
            
        </OnboardingScreens>
    );
}