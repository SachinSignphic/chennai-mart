import { View, Text } from "react-native";
import {useState} from "react";
import { ScrollView } from "react-native-gesture-handler";
import { Ionicons } from "@expo/vector-icons";
import CustomSwitch from "react-native-custom-switch-new";

const notification = () => {
    const [toggleSwitch, setToggleSwitch] = useState(false);

    return (
        <ScrollView className='px-8 gap-y-4 bg-white'>
            <View className='flex flex-row border justify-around items-center border-primary/40 rounded-xl px-4 py-4'>
                <Ionicons
                    name='logo-whatsapp'
                    size={28}
                    color='black'
                />
                <View className='flex flex-col gap-y-1 ml-3'>
                    <Text className='font-nunito-800 text-primary text-xl'>
                        WhatsApp Notifications
                    </Text>
                    <Text className='font-nunito-400 text-secondary text-md w-[50vw]'>
                        We send you updates and offers through WhatsApp
                    </Text>
                </View>
                <CustomSwitch
                    buttonWidth={20}
                    switchWidth={40}
                    switchBorderColor={"#2f2e41"}
                    buttonBorderWidth={0.4}
                    buttonPadding={2}
                    buttonColor={"white"}
                    switchBackgroundColor={'#ebebeb'}
                    onSwitchBackgroundColor={"#2f2e41"}
                />
            </View>
            <View className='flex flex-row border justify-around items-center border-primary/40 rounded-xl px-4 py-4'>
                <Ionicons
                    name='chatbubble-outline'
                    size={28}
                    color='black'
                />
                <View className='flex flex-col gap-y-1 ml-3'>
                    <Text className='font-nunito-800 text-primary text-xl'>
                        SMS Notifications
                    </Text>
                    <Text className='font-nunito-400 text-secondary text-md w-[50vw]'>
                        We send you updates and offers through SMS
                    </Text>
                </View>
                {/* <Switch
                    trackColor={{ true: "#2F2E41" }}
                    // style={{}}
                    thumbColor={"white"}
                    onValueChange={() => setToggleSwitch((prev) => !prev)}
                    value={toggleSwitch}
                /> */}
                <CustomSwitch
                    buttonWidth={20}
                    switchWidth={40}
                    switchBorderColor={"#2f2e41"}
                    buttonBorderWidth={0.4}
                    buttonPadding={2}
                    buttonColor={"white"}
                    switchBackgroundColor={'#ebebeb'}
                    onSwitchBackgroundColor={"#2f2e41"}
                />
            </View>
        </ScrollView>
    );
};

export default notification;
