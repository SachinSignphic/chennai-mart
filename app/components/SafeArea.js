import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";

const SafeArea = ({ children }) => {
    return (
        <SafeAreaView className={`bg-white flex-1 items-center justify-start`}>
            {/*  flex-1 pt-3 gap-6 items-center justify-start --> old styles dont work */}
            {children}
        </SafeAreaView>
    );
};

export default SafeArea;
