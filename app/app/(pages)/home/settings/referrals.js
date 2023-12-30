import { View, Text, ScrollView, TouchableOpacity } from "react-native";
import React from "react";
import { Ionicons } from "@expo/vector-icons";

const referrals = () => {
    return (
        <ScrollView className='px-8 bg-white'>
            <View className='flex px-6 py-4 bg-primary gap-5 rounded-xl m-1'>
                <Text className='text-white text-xl font-nunito-800'>
                    Refer to your friend!
                </Text>
                <Text className='text-white text-lg font-nunito-400'>
                    Introduce us to your friend & you both get 20% off on your
                    next purchase.
                </Text>
                <View className='flex flex-row items-center'>
                    <TouchableOpacity className='px-4 py-2 mr-2 rounded-xl bg-white'>
                        <Ionicons
                            name='logo-whatsapp'
                            size={24}
                            color='black'
                        />
                    </TouchableOpacity>
                    <TouchableOpacity className='px-4 py-2 rounded-xl bg-white'>
                        <Ionicons
                            name='link-outline'
                            size={24}
                            color='black'
                        />
                    </TouchableOpacity>
                </View>
            </View>
        </ScrollView>
    );
};

export default referrals;
