import { Tabs } from "expo-router/tabs";

export default function Layout() {
    return (
        <Tabs>
            <Tabs.Screen name='home' options={{
                title: "Home",
                headerShown: false,
            }} />
            <Tabs.Screen name='categories' options={{
                title: "Categories",
                headerShown: false,
            }} />
        </Tabs>
    );
}
