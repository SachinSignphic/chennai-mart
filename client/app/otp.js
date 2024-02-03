import { View, Text, Alert } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { router, useLocalSearchParams } from 'expo-router'
import OTPTextView from 'react-native-otp-textinput'
import { useDispatch } from "react-redux";
import { setUser } from '@context/user'
import storage from '@utils/storage'

const API_URL = process.env.EXPO_PUBLIC_SERVER_URL

const otp = () => {
    const { phone } = useLocalSearchParams();
    const dispatch = useDispatch();

    const handleOTPSubmit = async (otp) => {
        // API call for verification and token issuing
        // once JWT token is obtained, simply put it in localstorage and set global state to user data
        // whenever app opens, check if JWT is there, and if JWT is there, make a fetch call to server to verify authenticity
        // for now simply redirecting to home page
        // console.log(otp);
        if (otp.length === 4) {
            // actual API call
            // if OTP has expired, let user click resend OTP button and then send number via localSearchParams
            try {
                const verifyOTPRequest = await fetch(API_URL + '/auth/login', {
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        mobile: phone,
                        OTP: otp
                    }),
                    method: "POST"
                });

                const verifyOTPResponse = await verifyOTPRequest.json();
                console.log("🚀 ~ handleOTPSubmit ~ verifyOTPResponse:", verifyOTPResponse)
                
                if (!verifyOTPRequest.ok || verifyOTPResponse.error) {
                    throw new Error(verifyOTPResponse.error);
                }
                const { userId, userName, token } = verifyOTPResponse.data;

                dispatch(setUser({ userId, userName }))

                await storage.save({
                    key: 'user',
                    data: {
                        userName,
                        userId,
                        token
                    },
                    expires: 1000 * 60 // for now one minute.. but later change it to several days
                })
                router.push('/home');

            } catch (error) {
                console.log("🚀 ~ handleOTPSubmit ~ error:", error)
                Alert.alert(error.message, 'It was an unexpected error!', [{ style: "cancel", text: "OK", isPreferred: true }]);
            }
        }
    }

    return (
        <SafeAreaView className='flex flex-1 bg-white items-center justify-center'>
            <Text className='font-nunito-400 modern:text-2xl text-primary'>Enter your OTP that you have just recieved</Text>
            <View className='flex flex-row w-full p-3 justify-center items-center'>
                <OTPTextView keyboardType='numeric' inputCount={4} tintColor={'#2F2E41'} handleTextChange={handleOTPSubmit} />
            </View>
        </SafeAreaView>
    )
}

export default otp