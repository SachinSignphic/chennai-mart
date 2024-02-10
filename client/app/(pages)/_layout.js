import { Tabs, router, usePathname } from "expo-router";
import IonIcon from "@expo/vector-icons/Ionicons";
import FeatherIcon from "@expo/vector-icons/Feather";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { ToastAndroid, View, useWindowDimensions } from "react-native";
import store from "@context/store";
import { Provider } from "react-redux";
import storage from "@utils/storage";
import { IS_DEV } from "@/constants";

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

    // console.log(windowDimension, ICON_SIZE, TAB_BAR_HEIGHT);

    const regexPatternForRoutes =
        /^\/(cart(?:\/.*)?)?$|^\/home\/(product\/\d+|user\/.+|settings(?:\/.+)?|cart(?:\/.*)?)$/;

    const n = usePathname();

    const checkIfUserSessionExpired = async () => {
        try {
            const user = await storage.load({ key: 'user' });
        } catch (error) {
            switch (error.name) {
                case 'NotFoundError':
                    ToastAndroid.show("User not found. Please login", 5000) // prolly remove this switch case
                    router.replace("/login?showname=false");
                    break;
                case 'ExpiredError':
                ToastAndroid.show("User session expired. Please login", 5000) // prolly remove this switch case
                router.replace("/login?showname=false");
                break;
            }
        }
    }

    if (!IS_DEV) checkIfUserSessionExpired();

    return (
        <Provider store={store}>
            <Tabs
                backBehavior='history'
                initialRouteName="home"
                screenOptions={({ route, navigation }) => {
                    // console.log(JSON.stringify(n))
                    return {
                        tabBarActiveTintColor: "#fefefe",
                        tabBarStyle: {
                            display: "flex", // do the same trikcery to hide it in product page and in categories page
                            bottom: "2%",
                            alignSelf: "center",
                            height: regexPatternForRoutes.test(n) ? 0 : 90,
                            borderWidth: 1,
                            borderRadius: 10,
                            opacity: regexPatternForRoutes.test(n) ? 0 : 1,
                            width: "90%",
                            borderColor: "#424242",
                            borderTopColor: "#424242",
                            backgroundColor: "#2F2E41",
                            paddingVertical: 12,
                        },
                    };
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
        </Provider>
    );
}
