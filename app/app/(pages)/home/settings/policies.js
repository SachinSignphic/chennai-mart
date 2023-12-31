import { View, Text, ScrollView, TouchableOpacity } from "react-native";
import React from "react";
import { MaterialCommunityIcons } from "@expo/vector-icons";

const policies = () => {
    return (
        <ScrollView className='px-8 gap-y-4 bg-white'>
            <TouchableOpacity className='flex flex-row border justify-evenly items-center border-primary/40 rounded-xl px-4 py-4'>
                <MaterialCommunityIcons
                    name='file-document-outline'
                    size={30}
                    color='black'
                />
                <View className='flex flex-col gap-y-1 ml-3'>
                    <Text className='font-nunito-800 text-primary text-lg modern:text-xl'>
                        Terms & Conditions
                    </Text>
                    <Text className='font-nunito-400 text-secondary text-sm modern:text-md w-[50vw]'>
                        Terms & Conditions that you agree to while using the app
                    </Text>
                </View>
            </TouchableOpacity>
            <TouchableOpacity className='flex flex-row border justify-evenly items-center border-primary/40 rounded-xl px-4 py-4'>
                <MaterialCommunityIcons
                    name='shield-alert-outline'
                    size={30}
                    color='black'
                />
                <View className='flex flex-col gap-y-1 ml-3'>
                    <Text className='font-nunito-800 text-primary text-lg modern:text-xl'>
                        Privacy Policy
                    </Text>
                    <Text className='font-nunito-400 text-secondary text-sm modern:text-md w-[50vw]'>
                        We respect your privacy.
                    </Text>
                </View>
            </TouchableOpacity>
            <TouchableOpacity className='flex flex-row border justify-evenly items-center border-primary/40 rounded-xl px-4 py-4'>
                <MaterialCommunityIcons
                    name='open-source-initiative'
                    size={30}
                    color='black'
                />
                <View className='flex flex-col gap-y-1 ml-3'>
                    <Text className='font-nunito-800 text-primary text-lg modern:text-xl'>
                        Open Source Libraries
                    </Text>
                    <Text className='font-nunito-400 text-secondary text-sm modern:text-md w-[50vw]'>
                        Licenses on open-source libraries used to build this app
                    </Text>
                </View>
            </TouchableOpacity>
        </ScrollView>
    );
};

export default policies;
