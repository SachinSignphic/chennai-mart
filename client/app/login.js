import { View, Text, TextInput, BackHandler, Alert, Pressable } from 'react-native'
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
    const [canShowNameInput, setCanShowNameInput] = useState(showname !== "false");
    
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
        <SafeAreaView className='flex flex-1 bg-white items-center justify-center gap-y-2 px-4'>
            <Text className='font-nunito-400 modern:text-xl text-primary'>
                {canShowNameInput
                    ? `Tell us your name and number, we'll log you in`
                    : "Use your mobile number to log in"}
            </Text>
            {canShowNameInput && (
                <>
                    <Text className='text-primary text-left w-full px-2 font-nunito-400 mt-6 text-base modern:text-md'>
                        Name*
                    </Text>
                    <TextInput
                        ref={nameInputRef}
                        placeholder='My cool name'
                        className='bg-slate-100 border-primary/40 rounded-md w-full px-3 py-3 text-primary font-nunito-400 text-base modern:text-lg'
                        onChangeText={(value) => {
                            nameInputRef.current.value = value;
                        }}
                    />
                </>
            )}
            <Text className='text-primary text-left w-full px-2 font-nunito-400 mt-6 text-base modern:text-md'>
                Phone number*
            </Text>
            <View className='relative flex w-full mt-2'>
                <TextInput
                    inputMode='numeric'
                    onSubmitEditing={({ nativeEvent: { text } }) =>
                        handlePhoneSubmit(text)
                    }
                    className='bg-slate-100 border-primary/40 rounded-md w-full px-12 py-3 text-primary font-nunito-400 text-base modern:text-lg'
                />
                <Text className='absolute top-[22%] z-20 left-[3%] text-primary font-nunito-400 text-base modern:text-lg'>
                    +91
                </Text>
            </View>
            <Pressable onPress={() => setCanShowNameInput(!canShowNameInput)}>
                <Text>
                    {canShowNameInput
                        ? "I'm new here"
                        : "I already have an account"}
                </Text>
            </Pressable>
            {IS_DEV && <Link href={"/home"}>Test skip to home</Link>}
        </SafeAreaView>
    );
}

export default login