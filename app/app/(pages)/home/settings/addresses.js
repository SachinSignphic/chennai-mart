import { View, Text, ScrollView, TouchableOpacity } from "react-native";
import React from "react";
import { Feather } from "@expo/vector-icons";

const AddressItemCard = ({ name, address }) => {
    return (
        <View
            className='flex p-3.5 modern:p-6 modern:gap-y-2 mt-2 justify-center border border-primary/10 rounded-xl'
        >
            <Text className='text-primary font-nunito-400 text-lg modern:text-xl'>{name}</Text>
            <Text className='text-secondary text-sm modern:text-base font-medium'>
                {address}
            </Text>
            <View className='flex flex-row justify-end items-center'>
                <TouchableOpacity className='px-4 py-2 rounded-xl'>
                    <Feather
                        name='trash-2'
                        size={24}
                        color='red'
                    />
                </TouchableOpacity>
                <TouchableOpacity className='px-4 py-2 rounded-xl'>
                    <Feather
                        name='edit'
                        size={24}
                        color='black'
                    />
                </TouchableOpacity>
            </View>
        </View>
    );
};

const addresses = () => {
    return (
        <ScrollView className='bg-white px-4 modern:px-8 py-2'>
            <AddressItemCard
                name={"Z-Block house"}
                address={
                    "1/129, Z-Block, AD Block, Anna Nagar, Kanakkampalayam, Chennai, TamilNadu 638505, India"
                }
            />
            <AddressItemCard
                name={"VB Nagar office"}
                address={
                    "No. 69, 420th Street, VBS Mahal, Hasthinapuram, Chennai, TamilNadu"
                }
            />
        </ScrollView>
    );
};

export default addresses;
