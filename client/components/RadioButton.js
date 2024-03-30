import { View, Text } from "react-native";
import React from "react";

const RadioButton = ({
    title,
    subtitle,
    selected,
    icon: Icon = () => {},
    selectedIcon: SelectedIcon,
    extraIcon: ExtraIcon = () => {},
}) => {
    return (
        <View
            className={`flex flex-row items-center w-full rounded-md ${
                selected ? "bg-primary" : "bg-slate-100"
            } p-5`}>
            {selected ? <SelectedIcon /> : <Icon />}
            <View className='flex flex-col ml-4'>
                <Text
                    className={`${
                        selected ? "text-white" : "text-primary"
                    } font-nunito-400 text-lg modern:text-xl`}>
                    {title}
                </Text>
                {subtitle !== "" && (
                    <Text
                        className={`${
                            selected ? "text-slate-200" : "text-secondary"
                        } font-nunito-400 text-base modern:text-lg`}>
                        {subtitle}
                    </Text>
                )}
            </View>
            <View className='w-12 h-12 flex justify-center items-center ml-auto'>
                {<ExtraIcon />}
            </View>
        </View>
    );
};

export default RadioButton;
