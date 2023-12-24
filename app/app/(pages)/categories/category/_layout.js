import { StackHeader } from "@components";
import { Stack } from "expo-router";

export default Layout = () => {
    // get data from global categories and then derive dynamic stackheader title from it
    return (
        <Stack>
            <Stack.Screen
                name='[id]'
                options={{
                    title: "",
                    headerShown: false,
                }}
            />
        </Stack>
    );
};
