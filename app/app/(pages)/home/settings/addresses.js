import { View, Text, ScrollView, TouchableOpacity } from "react-native";
import React from "react";
import { Feather } from "@expo/vector-icons";

const AddressItemCard = ({ name, address }) => {
    return (
        <View
            className='flex py-6 px-6 gap-y-2 mt-2 justify-center border border-primary/10 rounded-xl'
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
            <Text className='text-primary font-nunito-400 text-xl'>{name}</Text>
            <Text className='text-secondary text-base font-medium'>
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
        <ScrollView className='bg-white px-8 py-2'>
            <AddressItemCard
                name={"Z-Block"}
                address={
                    "1/129, Z-Block, AD Block, Anna Nagar, Kanakkampalayam, Chennai, TamilNadu 638505, India"
                }
            />
            <AddressItemCard
                name={"VB Nagar"}
                address={
                    "No. 69, 420th Street, VBS Mahal, Hasthinapuram, Chennai, TamilNadu"
                }
            />
        </ScrollView>
    );
};

export default addresses;
