import { View, Text, ScrollView, TouchableOpacity } from "react-native";
import React from "react";
import { Ionicons } from "@expo/vector-icons";
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
                    <Text className='font-nunito-800 text-primary text-xl'>
                        Terms & Conditions
                    </Text>
                    <Text className='font-nunito-400 text-secondary text-md w-[50vw]'>
                        We send you updates and offers through WhatsApp
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
                    <Text className='font-nunito-800 text-primary text-xl'>
                        Privacy Policy
                    </Text>
                    <Text className='font-nunito-400 text-secondary text-md w-[50vw]'>
                        We send you updates and offers through WhatsApp
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
                    <Text className='font-nunito-800 text-primary text-xl'>
                        Open Source Libraries
                    </Text>
                    <Text className='font-nunito-400 text-secondary text-md w-[50vw]'>
                        We send you updates and offers through WhatsApp
                    </Text>
                </View>
            </TouchableOpacity>
        </ScrollView>
    );
};

export default policies;
