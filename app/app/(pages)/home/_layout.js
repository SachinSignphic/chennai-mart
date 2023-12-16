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
                    options={{ title: "Products" }} // later make this a dynamic name with reference to expo docs
                />
            </Stack>
        </Provider>
    );
};
