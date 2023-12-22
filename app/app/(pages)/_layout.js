import { Tabs } from "expo-router";
import IonIcon from "@expo/vector-icons/Ionicons";
import FeatherIcon from "@expo/vector-icons/Feather";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { View, useWindowDimensions } from "react-native";
import { useFonts } from "expo-font";
import { useCallback } from "react";

const TabIconWrapper = ({ tabBarIconProps, children }) => {
    return (
        <View
            className={`px-3 py-3 rounded-lg ${
                tabBarIconProps.focused ? "bg-tint-black" : "bg-transparent"
            }`}>
            {children}
        </View>
    );
};

export default function Layout() {
    const windowDimension = useWindowDimensions();
    const ICON_SIZE = (6 * windowDimension.width) / 100;
    const TAB_BAR_HEIGHT =
        windowDimension.width < 400
            ? (13 * windowDimension.height) / 100
            : (9 * windowDimension.height) / 100;
    // did this foolery to implement responsive design (mom small phone buggy)
    // start responsive work from productssection
    console.log(windowDimension, ICON_SIZE, TAB_BAR_HEIGHT);

    const [fontsLoaded, fontError] = useFonts({
        "Nunito ExtraBold": require("@assets/fonts/Nunito ExtraBold.otf"), // 800
        Nunito: require("@assets/fonts/Nunito.ttf"), // 400
        // "Nunito Black": require("@assets/fonts/Nunito Black.otf"), // 900
        // "Inter-SemiBoldItalic":
        //     "https://rsms.me/inter/font-files/Inter-SemiBoldItalic.otf?v=3.12",
    });

    const onLayoutRootView = useCallback(async () => {
        if (fontsLoaded || fontError) {
            SplashScreen.hideAsync();
        }
    }, [fontsLoaded, fontError]);

    if (!fontsLoaded && !fontError) {
        return null;
    }

    return (
        <Tabs
            screenOptions={{
                tabBarActiveTintColor: "#fefefe",
                tabBarStyle: {
                    // position: "absolute",
                    bottom: "2%",
                    // left: "50%",
                    // transform: [{ translateX: -270 }],
                    alignSelf: "center",
                    height: 90,
                    borderWidth: 1,
                    borderRadius: 10,
                    width: "90%",
                    borderColor: "#424242",
                    borderTopColor: "#424242",
                    backgroundColor: "#2F2E41",
                    paddingVertical: 12,
                    // opacity: 0.2
                },
            }}>
            <Tabs.Screen
                name='cart'
                options={{
                    title: "",
                    headerShown: false,
                    tabBarIcon: (tabBarIconProps) => (
                        <TabIconWrapper tabBarIconProps={tabBarIconProps}>
                            <FeatherIcon
                                name='shopping-bag'
                                size={ICON_SIZE}
                                color={"#fff"}
                                // maxFontSizeMultiplier={0.3}
                                // adjustsFontSizeToFit
                            />
                        </TabIconWrapper>
                    ),
                }}
            />

            <Tabs.Screen
                name='offers'
                options={{
                    title: "",
                    headerShown: false,
                    tabBarIcon: (tabBarIconProps) => (
                        <TabIconWrapper tabBarIconProps={tabBarIconProps}>
                            <FeatherIcon
                                name='tag'
                                size={ICON_SIZE}
                                color='#fff'
                            />
                        </TabIconWrapper>
                    ),
                }}
            />

            <Tabs.Screen
                name='categories'
                options={{
                    title: "",
                    headerShown: false,
                    tabBarIcon: (tabBarIconProps) => (
                        <TabIconWrapper tabBarIconProps={tabBarIconProps}>
                            <MaterialIcons
                                name='category'
                                size={ICON_SIZE}
                                color='#fff'
                            />
                        </TabIconWrapper>
                    ),
                }}
            />

            <Tabs.Screen
                name='home'
                options={{
                    title: "",
                    headerShown: false,
                    tabBarIcon: (tabBarIconProps) => (
                        <TabIconWrapper tabBarIconProps={tabBarIconProps}>
                            <IonIcon
                                name='home-outline'
                                size={ICON_SIZE}
                                color={"#fff"}
                            />
                        </TabIconWrapper>
                    ),
                }}
            />
        </Tabs>
    );
}
