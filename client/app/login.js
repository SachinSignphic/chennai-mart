import { View, Text, TextInput, BackHandler, Alert } from 'react-native'
import React, { useRef, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Link, router, useGlobalSearchParams, useLocalSearchParams, useNavigation } from 'expo-router'
import storage from '@utils/storage';
import 'react-native-url-polyfill/auto';
import { IS_DEV, API_URL } from '@/constants';

const login = () => {
    const navigation = useNavigation();
    const nameInputRef = useRef(null);
    // const [canShowNameInput, setCanShowNameInput] = useState(true);
    const { current: { showname } } = useRef(useLocalSearchParams());
    console.log("🚀 ~ login ~ showname:", showname)
    
    const checkIfOnboardingComplete = async () => {
        try {
            const hasSwiperBeenPlayed = await storage.load({ key: 'isSwiperPlayed' });
            if (hasSwiperBeenPlayed) {
                // add back amukura event listener and prevented default behaviour. once clicked, no need to go to onboarding. simply exit!
                navigation.addListener("beforeRemove", (e) => {
                    e.preventDefault();
                    BackHandler.exitApp();
                })
            }
        } catch (error) {
            // console.warn(error.message);
            switch (error.name) {
                case 'NotFoundError':
                    console.log("SwiperPlayed state not found!"); // prolly remove this switch case
                    break;
                case 'ExpiredError':
                    // not possible because it never expires
                    break;
            }
        }
    }

    checkIfOnboardingComplete();

    const handlePhoneSubmit = async (phone) => {
        console.log(phone);
        // call API to send OTP, once sent, go to OTP page
        if (IS_DEV) return router.push('/home')
        try {
            const OTPRequest = await fetch(API_URL + '/auth/req-otp', {
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    mobile: phone,
                    name: nameInputRef?.current?.value
                }),
                method: "POST"
            });
            
            const OTPResponse = await OTPRequest.text();
            console.log("🚀 ~ handlePhoneSubmit ~ OTPResponse:", OTPResponse)
            if (!OTPRequest.ok || OTPResponse.error) {
                throw new Error(OTPResponse.error);
            }
            router.push(`/otp?phone=${phone}`);

        } catch (error) {
            console.log(error);
            Alert.alert(error.message, 'It was unexpected!', [{ style: "cancel", text: "OK", isPreferred: true }]);
        }
    }

    return (
        <SafeAreaView className='flex flex-1 bg-white items-center justify-center gap-y-2'>
            <Text className='font-nunito-400 modern:text-xl text-primary mb-5'>{showname !== "false" ? `Tell us your name and number, we'll log you in`: 'Use your mobile number to log in'}</Text>
            {
                showname !== "false" && <TextInput ref={nameInputRef} placeholder='My cool name' className='px-3 w-[90%] font-nunito-400 border border-primary/40 text-md modern:text-xl py-3 bg-teal rounded-xl' onChangeText={value => {
                    nameInputRef.current.value = value
                }} />
            }
            <View className='flex relative flex-row w-full p-3 justify-center items-center'>
                <Text className='absolute top-[43%] z-20 left-[7%] font-nunito-400 modern:text-xl text-primary'>+91 </Text>
                <TextInput
                    inputMode='numeric'
                    placeholder=''
                    onSubmitEditing={({ nativeEvent: { text } }) => handlePhoneSubmit(text)} // replace with a function that calls backend and waits for response from server that OTP has been sent
                    className='px-2 pl-12 w-[94%] font-nunito-400 border text-md modern:text-xl border-primary/40 py-3 bg-teal rounded-xl'
                />
            </View>
            {
                IS_DEV && <Link href={'/home'}>Test skip to home</Link>
            }
        </SafeAreaView>
    )
}

export default login