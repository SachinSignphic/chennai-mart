import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";

const SafeArea = ({ children }) => {
    return (
        <SafeAreaView className={`bg-white flex-1 items-center justify-start`}>
            {children}
        </SafeAreaView>
    );
};

export default SafeArea;
