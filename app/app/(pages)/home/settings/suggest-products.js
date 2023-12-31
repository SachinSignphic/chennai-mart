import { View, Text } from "react-native";
import React from "react";
import {
    ScrollView,
    TextInput,
    TouchableOpacity,
} from "react-native-gesture-handler";

const suggest = () => {
    return (
        <ScrollView className='px-8 bg-white gap-y-5'>
            <Text className='text-primary text-md modern:text-lg font-nunito-400'>
                Didn&apos;t find what you are looking for ? Please suggest the
                products
            </Text>
            <TextInput
                numberOfLines={6}
                multiline={true}
                className='rounded-2xl bg-teal/60 p-4'
                style={{ textAlignVertical: "top" }}></TextInput>
            <TouchableOpacity className='bg-primary rounded-lg'>
                <Text className='font-nunito-400 self-center py-3 text-white text-md modern:text-lg'>
                    Request product(s)
                </Text>
            </TouchableOpacity>
        </ScrollView>
    );
};

export default suggest;
