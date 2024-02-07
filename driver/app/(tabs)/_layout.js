import { View, Text, useWindowDimensions } from 'react-native'
import React from 'react'
import { Tabs } from 'expo-router'
import { SimpleLineIcons, Ionicons, FontAwesome5 } from '@expo/vector-icons';

export function TabIconWrapper({ tabBarIconProps, children }) {
    return (
        <View
            className={`px-3 py-3 rounded-lg ${tabBarIconProps.focused ? "bg-tint-black" : "bg-transparent"}`}>
            {children}
        </View>
    );
};

const Layout = () => {
    const windowDimension = useWindowDimensions();
    const ICON_SIZE = (6 * windowDimension.width) / 100;

    return (
        <Tabs 
        initialRouteName='home'
        screenOptions={({ route, navigation }) => {
            return {
                headerShown: false,
                tabBarActiveTintColor: "#fefefe",
                tabBarStyle: {
                    display: "flex",
                    bottom: "2%",
                    alignSelf: "center",
                    height: 90,
                    borderWidth: 1,
                    borderRadius: 10,
                    opacity: 1,
                    width: "90%",
                    borderColor: "#424242",
                    borderTopColor: "#424242",
                    backgroundColor: "#2F2E41",
                    paddingVertical: 12,
                },
            };
        }}>
            <Tabs.Screen name='profile' options={{
                title: "",
                headerShown: false,
                tabBarIcon: (tabBarIconProps) => (
                    <TabIconWrapper tabBarIconProps={tabBarIconProps}>
                         <FontAwesome5 name="user" size={ICON_SIZE-2} color="#fff" />
                    </TabIconWrapper>
                ),
            }} />
            <Tabs.Screen name='wallet' options={{
                title: "",
                headerShown: false,
                tabBarIcon: (tabBarIconProps) => (
                    <TabIconWrapper tabBarIconProps={tabBarIconProps}>
                        <SimpleLineIcons name="wallet" size={ICON_SIZE} color="#fff" />
                    </TabIconWrapper>
                ),
            }}  />
            <Tabs.Screen name='home' options={{
                title: "",
                headerShown: false,
                tabBarIcon: (tabBarIconProps) => (
                    <TabIconWrapper tabBarIconProps={tabBarIconProps}>
                        <Ionicons
                            name='home-outline'
                            size={ICON_SIZE}
                            color={"#fff"}
                        />
                    </TabIconWrapper>
                ),
            }} />
        </Tabs>
    )
}

export default Layout