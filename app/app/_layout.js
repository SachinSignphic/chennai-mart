import { StackHeader } from "@components";
import { Stack } from "expo-router";

export default function Layout() {
    return (
        <Stack
            screenOptions={{
                headerShown: false,
            }}>
            <Stack.Screen name='index' />
            <Stack.Screen name='location' options={{
                headerShown: true,
                header: () => <StackHeader headerTitle={"Choose location"} />
            }} />
        </Stack>
    );
}
