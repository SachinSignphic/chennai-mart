import {
    View,
    Text,
    ScrollView,
    TextInput,
    TouchableOpacity,
    ToastAndroid,
    Alert,
    ActivityIndicator,
} from "react-native";
import React, { useEffect, useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import { useDispatch, useSelector } from "react-redux";
import { API_URL } from "@/constants";
import { getToken } from "@/utils/fetch";
import { loadOrders } from "@/context/orders";

const orderStatusMap = {
    "placed": {
        status: "placed",
        badge: "bg-badge-regular",
        "badge-text": "text-white",
    },
    "dispatched": {
        status: "dispatched",
        badge: "bg-badge-regular",
        "badge-text": "text-regular",
    },
    "delivered": {
        status: "delivered",
        badge: "bg-badge-success",
        "badge-text": "text-success",
    },
    "cancelled": {
        status: "cancelled",
        badge: "bg-badge-critical",
        "badge-text": "text-critical",
    },
    "failed": {
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
        <View className='flex p-3.5 modern:p-6 modern:gap-y-2 border border-primary/10 mt-4 modern:mt-2 justify-center rounded-xl'>
            <View className='flex flex-row justify-between items-center'>
                <Text className='text-primary font-nunito-400 text-lg modern:text-xl'>
                    {orderName}
                </Text>
                <Text className='text-primary font-nunito-400 text-md modern:text-lg'>
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
                        orderStatusMap[orderStatus]?.badge ?? "bg-badge-regular"
                    } ${
                        (orderStatusMap[orderStatus] && orderStatusMap[orderStatus]["badge-text"]) ??
                        "text-regular"
                    } rounded-xl text-sm px-3 py-1`}>
                    {orderStatus}
                </Text>
                <TouchableOpacity className='flex rounded-md bg-primary px-3 modern:px-5 py-2 flex-row items-center justify-center'>
                    <Text className='text-white text-md modern:text-lg font-nunito-400'>
                        Details
                    </Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

const orders = () => {
    const orderData = useSelector((state) => state.orders);
    const dispatch = useDispatch();
    const [isLoading, setIsLoading] = useState(orderData.orders.length < 1);

    useEffect(() => {
      const fetchOrderData = async () => {
        try {
            const ordersRequest = await fetch(
                process.env.EXPO_PUBLIC_API_URL + "/order/",
                {
                    method: "GET",
                    headers: {
                        Auth: await getToken(),
                    },
                }
            );
            const ordersResponse = await ordersRequest.json();
            console.log("🚀 ~ fetchOrderData ~ ordersResponse:", ordersResponse)
            
            if (ordersRequest.status == 404) {
                Alert.alert('Error', ordersResponse.error, [{ style: "cancel", text: "OK" }]);
                return;
            }
            
            if (ordersRequest.status == 200) {
                setIsLoading(false);
                dispatch(loadOrders(ordersResponse));
            }

        } catch (error) {
            console.log("🚀 ~ fetchOrderData ~ error:", error);
            Alert.alert("Unexpected Error", error, [
                { style: "cancel", text: "OK" },
            ]);
        }
      }

      if (orderData.orders.length < 1) fetchOrderData(); 

    }, [])
    

    return (
        <ScrollView className='bg-white px-4 modern:px-8'>
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
            {
                isLoading && <ActivityIndicator size={46} />
            }
            {
                orderData.orders.map(order => (
                    <OrderItemCard
                        key={order.id}
                        orderId={order.id}
                        orderDate={order.date}
                        orderTime={order.time}
                        orderName={order.name}
                        price={order.total}
                        orderStatus={order.status}
                    />

                ))
            }
        </ScrollView>
    );
};

export default orders;
