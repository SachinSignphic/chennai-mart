import { View, Text, TouchableOpacity, ScrollView, Alert } from "react-native";
import React, { useEffect, useState } from "react";
import OnboardingScreens from "@/components/OnboardingScreens";
import CustomSwitch from "react-native-custom-switch-new";
import { Entypo } from "@expo/vector-icons";
import Divider from "@/components/Divider";
import { API_URL } from "@/constants";
import { router } from "expo-router";

const TESTING_DRIVDER_ID = "660af194710fd3695f610609";

const dashboard = () => {
    const [orders, setOrders] = useState(null);
    const [isWorking, setIsWorking] = useState(true);
    const [isLoading, setIsLoading] = useState(false);

    // this entire useEffect is to simulate loading orders
    const fetchOrders = async () => {
        try {
            const orderReq = await fetch(API_URL + "/driver/orders/get");
            const orderRes = await orderReq.json();
            console.log("🚀 ~ fetchOrders ~ orders:", orderRes);
            setOrders(orderRes);
        } catch (error) {
            console.log("🚀 ~ fetchOrders ~ error:", error);
            setOrders([]);
        }
    };

    const handleDeliveryAcceptance = async (orderid) => {
        try {
            setIsLoading(true);
            const acceptReq = await fetch(API_URL + "/driver/orders/accept", {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ orderId: orderid, driverId: TESTING_DRIVDER_ID })
            });
            const acceptRes = await acceptReq.json();
            console.log("🚀 ~ handleDeliveryAcceptance ~ acceptRes:", acceptRes);
            router.push('/current-order');
        } catch (error) {
            console.log("🚀 ~ handleDeliveryAcceptance ~ error:", error)
            Alert.alert('Could not accept order!', 'Please contact help', [{ style: "cancel", text: "OK" }])   
        } finally {
            setIsLoading(false);
        }
    }

    useEffect(() => {
        fetchOrders();
    }, []);

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
                    switchBackgroundColor={"#ebebeb"}
                    onSwitchBackgroundColor={"#2f2e41"}
                    buttonText={"Work"}
                    buttonTextStyle={{ fontSize: 10 }}
                    onSwitchButtonText={"Break"}
                    onSwitchButtonTextStyle={{ fontSize: 10 }}
                />
            </View>
            <View className='flex w-full rounded-2xl p-6 bg-primary/95'>
                <View className='flex flex-row items-center mb-4 justify-between w-full'>
                    <Text className='text-primary font-nunito-400 text-base modern:text-lg px-4 py-1 rounded-full bg-teal/90'>
                        5AM — 2PM
                    </Text>
                    <Text className='text-teal font-nunito-400 text-base modern:text-lg'>
                        {isWorking ? "Shift Ongoing" : "On break!"}
                    </Text>
                </View>
                <View className='flex flex-row items-center w-full pl-2'>
                    <Entypo
                        name='time-slot'
                        size={30}
                        color='white'
                    />
                    <View className='flex flex-row items-end ml-2'>
                        <Text className='text-teal font-nunito-400 text-lg modern:text-xl'>
                            5
                        </Text>
                        <Text className='text-teal font-nunito-400 text-xs'>
                            hr
                        </Text>
                        <Text className='text-teal font-nunito-400 text-lg modern:text-xl'>
                            23
                        </Text>
                        <Text className='text-teal font-nunito-400 text-xs'>
                            min
                        </Text>
                    </View>
                    <View className='flex flex-col ml-auto bg-teal rounded-xl px-6 py-3 items-center'>
                        <Text className='font-nunito-400 text-red-600 text-base'>
                            BREAK
                        </Text>
                        <Text className='font-nunito-400 text-primary text-base'>
                            15 mins left
                        </Text>
                    </View>
                </View>
            </View>
            <View className='flex flex-col w-full p-6 items-center bg-secondary/10 rounded-xl mt-6'>
                <View className='flex flex-row w-full justify-center gap-x-2 items-center mb-4'>
                    <Entypo
                        name='shopping-bag'
                        size={24}
                        color='black'
                    />
                    <Text className='text-primary font-nunito-400 text-base'>
                        {orders
                            ? orders.length > 0
                                ? "Next Order"
                                : "No orders"
                            : "Waiting for next order"}
                    </Text>
                </View>
                <Divider />
                <View className='flex flex-col w-full justify-center gap-y-4 items-center mt-3'>
                    {orders ? (
                        orders.length > 0 ? (
                            orders.map((order) => (
                                <View key={order.id} className='flex-col w-full gap-y-2'>
                                    <View className='flex-row gap-x-4 w-full items-start'>
                                        <Entypo
                                            name='location'
                                            size={24}
                                            color='black'
                                        />
                                        <Text className='text-primary font-nunito-400 text-lg modern:text-xl'>
                                            {order.address}
                                        </Text>
                                    </View>
                                    <View className='flex flex-row justify-center gap-x-4 items-center'>
                                        <TouchableOpacity
                                            disabled={(!isWorking || isLoading)}
                                            className={`bg-teal ${
                                                (!isWorking || isLoading) && "opacity-50"
                                            } rounded-full px-6 py-2 border border-primary/20`}
                                            activeOpacity={0.8}>
                                            <Text className='text-primary font-nunito-400 text-base'>
                                                DECLINE
                                            </Text>
                                        </TouchableOpacity>
                                        <TouchableOpacity
                                            disabled={(!isWorking || isLoading)}
                                            className={`bg-primary ${
                                                (!isWorking || isLoading) && "opacity-50"
                                            } rounded-full px-6 py-2 border border-primary/20`}
                                            activeOpacity={0.8}
                                            onPress={() => handleDeliveryAcceptance(order.id)}
                                        >
                                            <Text className='text-teal font-nunito-400 text-base'>
                                                ACCEPT
                                            </Text>
                                        </TouchableOpacity>
                                    </View>
                                </View>
                            ))
                        ) : (
                            <>
                                <Text className='text-primary font-nunito-400 text-base'>
                                    No orders
                                </Text>
                            </>
                        )
                    ) : (
                        <Text>Loading...</Text>
                    )}
                </View>
            </View>
            <View className='flex flex-col w-full p-6 items-center bg-secondary/10 rounded-xl mt-6'>
                <View className='flex flex-row p-4 items-center justify-between w-full rounded-xl'>
                    <View>
                        <Text className='text-primary font-nunito-400 text-base'>
                            Earnings
                        </Text>
                        <Text className='text-primary font-nunito-800 text-lg modern:text-2xl'>
                            ₹ 0
                        </Text>
                    </View>
                    <View className='bg-secondary/40 ml-auto mr-5 flex h-[1] w-[50%] self-center'></View>
                    <Entypo
                        name='wallet'
                        size={36}
                        color='black'
                    />
                </View>
                <View className='flex flex-row p-4 items-center justify-between w-full rounded-xl'>
                    <View>
                        <Text className='text-primary font-nunito-400 text-base'>
                            Orders
                        </Text>
                        <Text className='text-primary font-nunito-800 text-lg modern:text-2xl'>
                            0
                        </Text>
                    </View>
                    <View className='bg-secondary/40 ml-auto mr-5 flex h-[1] w-[50%] self-center'></View>
                    <Entypo
                        name='shopping-bag'
                        size={36}
                        color='black'
                    />
                </View>
            </View>
        </OnboardingScreens>
    );
};

export default dashboard;
