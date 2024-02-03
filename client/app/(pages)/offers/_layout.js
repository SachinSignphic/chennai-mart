import { StackHeader } from "@components";
import { Stack } from "expo-router";

export default Layout = () => {
    return (
        <Stack>
            <Stack.Screen
                name='index'
                options={{ title: "Offers", header: () => <StackHeader headerTitle={"Offer store"} />}}
            />
        </Stack>
    );
};
