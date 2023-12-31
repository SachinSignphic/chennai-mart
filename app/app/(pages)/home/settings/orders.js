import {
    View,
    Text,
    ScrollView,
    TextInput,
    TouchableOpacity,
} from "react-native";
import React from "react";
import { Ionicons } from "@expo/vector-icons";

// orderStatus 1 --> placed
// orderStatus 2 --> dispatched
// orderStatus 3 --> delivered
// orderStatus 4 --> cancelled
// orderStatus 5 --> failed
const orderStatusMap = {
    1: {
        status: "placed",
        badge: "bg-badge-regular",
        "badge-text": "text-white",
    },
    2: {
        status: "dispatched",
        badge: "bg-badge-regular",
        "badge-text": "text-regular",
    },
    3: {
        status: "delivered",
        badge: "bg-badge-success",
        "badge-text": "text-success",
    },
    4: {
        status: "cancelled",
        badge: "bg-badge-critical",
        "badge-text": "text-critical",
    },
    5: {
        status: "failed",
        badge: "bg-badge-critical",
        "badge-text": "text-critical",
    },
};

const OrderItemCard = ({
    orderName,
    price,
    orderStatus,
    orderDate,
    orderTime,
    orderId,
    buttonText,
}) => {
    return (
        <View
            className='flex py-6 px-6 gap-y-2 border border-primary/10 mt-2 max-modern:mt-4 justify-center rounded-xl'
            style={{
                shadowColor: "#00000015",
                shadowOffset: {
                    width: 0,
                    height: 1,
                },
                shadowOpacity: 0.1,
                shadowRadius: 12,
                elevation: 5,
            }}>
            <View className='flex flex-row justify-between items-center'>
                <Text className='text-primary font-nunito-400 text-xl'>
                    {orderName}
                </Text>
                <Text className='text-primary font-nunito-400 text-lg'>
                    ₹{price}
                </Text>
            </View>
            <View className='flex gap-1'>
                <Text className='text-secondary text-base font-medium'>
                    Order ID: {orderId}
                </Text>
                <Text className='text-secondary text-base font-medium'>
                    {orderDate} at {orderTime}
                </Text>
            </View>
            <View className='flex flex-row justify-between items-center'>
                <Text
                    className={`${
                        orderStatusMap[orderStatus].badge ?? "bg-badge-regular"
                    } ${
                        orderStatusMap[orderStatus]["badge-text"] ??
                        "text-regular"
                    } rounded-xl text-sm px-3 py-1`}>
                    {orderStatusMap[orderStatus].status}
                </Text>
                <TouchableOpacity className='flex rounded bg-primary px-5 py-2 flex-row items-center justify-center'>
                    <Text className='text-white text-lg font-nunito-400'>
                        Reorder
                    </Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

const orders = () => {
    return (
        <ScrollView className='bg-white px-8 max-modern:px-4'>
            <View className='flex flex-row justify-center gap-6 items-center mb-6'>
                <Ionicons
                    name='md-search-outline'
                    size={24}
                    className='text-primary'
                />
                <TextInput
                    placeholder='Search for OrderId, Order item, etc.'
                    className='border-b border-b-slate-300 py-2 font-nunito-400 text-base w-[80%]'
                    // value={searchKey}
                    // onChangeText={(e) => dispatch(inputText(e))}
                />
            </View>
            <OrderItemCard
                orderId={"#BSD347IO8"}
                orderDate={"30/12/2023"}
                orderTime={"9:48 AM"}
                orderName={"Bell Pepper Red"}
                orderStatus={1}
                price={320}
            />
            <OrderItemCard
                orderId={"#HOI3489OP2"}
                orderDate={"30/12/2023"}
                orderTime={"10:23 AM"}
                orderName={"Carrots"}
                price={300}
                orderStatus={3}
            />
        </ScrollView>
    );
};

export default orders;
