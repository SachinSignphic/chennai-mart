import { View, Text, TouchableOpacity, ScrollView } from 'react-native'
import React, { useEffect, useState } from 'react'
import OnboardingScreens from '@/components/OnboardingScreens'
import CustomSwitch from "react-native-custom-switch-new";
import { Entypo } from '@expo/vector-icons';
import Divider from '@/components/Divider';

const dashboard = () => {
    const [nextOrderData, setNextOrderData] = useState(null);
    const [isWorking, setIsWorking] = useState(true)

    // this entire useEffect is to simulate loading orders
    useEffect(() => {
        const dummyTimeOut = () => {
            setNextOrderData({ place: "Wimco Nagar" });
        }

        setTimeout(dummyTimeOut, 4000);

        return () => clearTimeout(dummyTimeOut);
    }, [])

    return (
        <OnboardingScreens scrollView={true}>
            <View className='px-2 py-12 flex flex-row justify-between w-full items-center'>
                <Text>L</Text>
                <CustomSwitch
                    buttonWidth={30}
                    switchWidth={60}
                    onSwitch={() => setIsWorking(false)}
                    onSwitchReverse={() => setIsWorking(true)}
                    buttonPadding={2}
                    buttonColor={"white"}
                    switchBackgroundColor={'#ebebeb'}
                    onSwitchBackgroundColor={"#2f2e41"}
                    buttonText={"Work"}
                    buttonTextStyle={{ fontSize: 10 }}
                    onSwitchButtonText={"Break"}
                    onSwitchButtonTextStyle={{ fontSize: 10 }}
                />
            </View>
            <View className='flex w-full rounded-2xl p-6 bg-primary/95'>
                <View className='flex flex-row items-center mb-4 justify-between w-full'>
                    <Text className='text-primary font-nunito-400 text-base modern:text-lg px-4 py-1 rounded-full bg-teal/90'>5AM — 2PM</Text>
                    <Text className='text-teal font-nunito-400 text-base modern:text-lg'>{isWorking ? "Shift Ongoing": "On break!"}</Text>
                </View>
                <View className='flex flex-row items-center w-full pl-2'>
                    <Entypo name="time-slot" size={30} color="white" />
                    <View className='flex flex-row items-end ml-2'>
                        <Text className='text-teal font-nunito-400 text-lg modern:text-xl'>5</Text>
                        <Text className='text-teal font-nunito-400 text-xs'>hr</Text>
                        <Text className='text-teal font-nunito-400 text-lg modern:text-xl'>23</Text>
                        <Text className='text-teal font-nunito-400 text-xs'>min</Text>
                    </View>
                    <View className='flex flex-col ml-auto bg-teal rounded-xl px-6 py-3 items-center'>
                        <Text className='font-nunito-400 text-red-600 text-base'>BREAK</Text>
                        <Text className='font-nunito-400 text-primary text-base'>15 mins left</Text>
                    </View>
                </View>
            </View>
            <View className='flex flex-col w-full p-6 items-center bg-secondary/10 rounded-xl mt-6'>
                <View className='flex flex-row w-full justify-center gap-x-2 items-center mb-4'>
                    <Entypo name="shopping-bag" size={24} color="black" />
                    <Text className='text-primary font-nunito-400 text-base'>{
                        nextOrderData ? "Next Order" : "Waiting for order"
                    }</Text>
                </View>
                <Divider />
                <View className='flex flex-row w-full justify-center gap-x-4 items-center mt-3'>
                    {
                        nextOrderData ?
                            <>
                                <Entypo name="location" size={30} color="black" />
                                <Text className='text-primary font-nunito-800 text-lg modern:text-2xl'>{nextOrderData.place}</Text>
                            </>
                            :
                            <></>
                    }
                </View>
                {
                    nextOrderData ?
                        <View className='flex flex-row mt-5 w-full justify-center gap-x-8 items-center'>
                            <TouchableOpacity disabled={!isWorking} className={`bg-teal ${!isWorking && 'opacity-50'} rounded-full px-6 py-2 border border-primary/20`} activeOpacity={0.8}>
                                <Text className='text-primary font-nunito-400 text-base'>DECLINE</Text>
                            </TouchableOpacity>
                            <TouchableOpacity disabled={!isWorking} className={`bg-primary ${!isWorking && 'opacity-50'} rounded-full px-6 py-2 border border-primary/20`} activeOpacity={0.8}>
                                <Text className='text-teal font-nunito-400 text-base'>ACCEPT</Text>
                            </TouchableOpacity>
                        </View>
                        :
                        <></>
                }
            </View>
            <View className='flex flex-col w-full p-6 items-center bg-secondary/10 rounded-xl mt-6'>
                <View className='flex flex-row p-4 items-center justify-between w-full rounded-xl'>
                    <View>
                        <Text className='text-primary font-nunito-400 text-base'>Earnings</Text>
                        <Text className='text-primary font-nunito-800 text-lg modern:text-2xl'>₹ 5,234</Text>
                    </View>
                    <View className='bg-secondary/40 ml-auto mr-5 flex h-[1] w-[50%] self-center'></View>
                    <Entypo name="wallet" size={36} color="black" />
                </View>
                <View className='flex flex-row p-4 items-center justify-between w-full rounded-xl'>
                    <View>
                        <Text className='text-primary font-nunito-400 text-base'>Orders</Text>
                        <Text className='text-primary font-nunito-800 text-lg modern:text-2xl'>{nextOrderData ? 27 : 26}</Text>
                    </View>
                    <View className='bg-secondary/40 ml-auto mr-5 flex h-[1] w-[50%] self-center'></View>
                    <Entypo name="shopping-bag" size={36} color="black" />
                </View>
            </View>
        </OnboardingScreens>
    )
}

export default dashboard