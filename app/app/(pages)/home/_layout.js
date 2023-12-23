import store from "@context/store";
import { MaterialIcons } from "@expo/vector-icons";
import { Stack, router } from "expo-router";
import { Text, View, TouchableOpacity } from "react-native";
// import { Image } from "react-native";
import { Provider } from "react-redux";

const StackHeader = ({ headerTitle }) => {
    return (
        <View className='flex flex-row justify-start w-full py-10'>
            <TouchableOpacity
                onPress={router.back}
                hitSlop={10}
                className='p-4 absolute flex self-center z-50'>
                <MaterialIcons
                    name='arrow-back-ios'
                    size={14}
                    color='black'
                />
            </TouchableOpacity>
            <Text className='text-xl text-center w-full flex self-center font-nunito-400 text-primary'>
                {headerTitle}
            </Text>
        </View>
    );
};

export default Layout = () => {
    return (
        <Provider store={store}>
            <Stack>
                <Stack.Screen
                    name='index'
                    options={{
                        title: "Home",
                        headerTintColor: "black",
                        headerShown: false,
                    }}
                />
                <Stack.Screen
                    name='product'
                    options={{ title: "Products" }} // later make this dynamic by showing product name maybe
                />
                <Stack.Screen
                    name='settings'
                    options={{
                        header: () => <StackHeader headerTitle='Settings' />,
                        headerBackVisible: false,
                        // headerTitleAlign: "center",
                        // headerLeft: ,
                    }}
                />
                <Stack.Screen
                    name='user'
                    options={{
                        headerBackVisible: false,
                        header: () => <StackHeader headerTitle='Profile' />,
                    }}
                />
            </Stack>
        </Provider>
    );
};
