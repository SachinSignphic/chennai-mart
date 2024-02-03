import { StackHeader } from "@components";
import { Stack } from "expo-router";
import { Provider } from "react-redux";
import store from "@context/store";

export default function Layout() {
    return (
        <Provider store={store}>
            <Stack
                screenOptions={{
                    headerShown: false,
                }}>
                <Stack.Screen name='index' />
                <Stack.Screen name='login' />
                <Stack.Screen name='location' options={{
                    headerShown: true,
                    header: () => <StackHeader headerTitle={"Choose location"} />
                }} />
            </Stack>
        </Provider>
    );
}
