import { Tabs } from "expo-router/tabs";

export default function Layout() {
    return (
        <Tabs>
            <Tabs.Screen name='index' options={{
                title: "Home"
            }} />
        </Tabs>
    );
}
