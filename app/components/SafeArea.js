import React from "react";
import { ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const SafeArea = ({ children }) => {
    return (
        <SafeAreaView>
            {/*  flex-1 pt-3 gap-6 items-center justify-start --> old styles dont work */}
            <ScrollView
                contentContainerStyle={{
                    // flex: 1,
                    display: 'flex',
                    backgroundColor: "#fff",
                    // justifyContent: 'start'/,
                    alignItems: 'center'
                }}>
                {children}
            </ScrollView>
        </SafeAreaView>
    );
};

export default SafeArea;
