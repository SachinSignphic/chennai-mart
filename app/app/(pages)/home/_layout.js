import store from "@context/store";
import { Stack } from "expo-router";
import { Provider } from "react-redux";

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
                    options={{ title: "Settings" }} 
                />
                <Stack.Screen
                    name='user'
                    options={{ title: "User" }} 
                />
            </Stack>
        </Provider>
    );
};
