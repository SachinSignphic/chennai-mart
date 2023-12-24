import { StackHeader } from "@components";
import { Stack } from "expo-router";

export default Layout = () => {
    return (
        <Stack>
            <Stack.Screen
                name='index'
                options={{
                    title: "",
                    // headerShown: false,
                    header: () => <StackHeader headerTitle={"Categories"} />,
                }}
            />
            <Stack.Screen
                name='category'
                options={{
                    title: '',
                    // headerShown: false,
                    header: () => <StackHeader headerTitle={"Category"} />,
                }}
            />
        </Stack>
    );
};
