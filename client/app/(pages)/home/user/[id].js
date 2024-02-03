import { View, Text, ToastAndroid } from "react-native";
import React from "react";
import { router, useGlobalSearchParams } from "expo-router";
import {
    ScrollView,
    TextInput,
    TouchableOpacity,
} from "react-native-gesture-handler";

const index = () => {
    const { id } = useGlobalSearchParams();

    return (
        <ScrollView className='bg-white px-4 modern:px-6 flex gap-y-2 modern:gap-y-4'>
            <View className='flex gap-y-2'>
                <Text className='font-nunito-400 text-primary text-lg'>
                    Your name:
                </Text>
                <TextInput
                    placeholder=''
                    defaultValue='Developer'
                    className='px-4 text-md modern:text-lg py-2 bg-teal rounded-xl'
                />
            </View>
            <View className='flex gap-y-2'>
                <Text className='font-nunito-400 text-primary text-lg'>
                    Your email:
                </Text>
                <TextInput
                    placeholder=''
                    defaultValue='sample@xmail.com'
                    className='px-4 text-md modern:text-lg py-2 bg-teal rounded-xl'
                />
            </View>
            <TouchableOpacity className='bg-primary px-3 py-3 rounded-xl mt-5' onPress={() => {
                ToastAndroid.show("Changes saved", ToastAndroid.SHORT);
                router.back();
            }}>
                <Text className='text-white text-md modern:text-lg font-nunito-400 self-center'>
                    Save Changes
                </Text>
            </TouchableOpacity>
        </ScrollView>
    );
};

export default index;
