import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import { router, useNavigation } from "expo-router";
import { Ionicons } from "@expo/vector-icons";

const StackHeader = ({ headerTitle, routeAction }) => {
    const navigation = useNavigation();
    return (
        <View
            className={`flex flex-row "bg-white"
                  justify-start w-full py-6 modern:py-8 mt-6`}>
            <TouchableOpacity
                onPress={
                    routeAction ? () => router.push(routeAction) : navigation.goBack
                }
                hitSlop={10}
                className='p-2 left-5 absolute flex self-center bg-primary rounded-xl z-50'>
                <Ionicons
                    name='arrow-back-sharp'
                    size={24}
                    color='white'
                />
            </TouchableOpacity>
            <Text
                className={`text-center w-full flex self-center font-nunito-800 text-primary text-base modern:text-xl`}>
                {headerTitle}
            </Text>
        </View>
    );
};

export default StackHeader;
