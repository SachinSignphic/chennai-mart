// this file is probably gonna contain functions for data fetching from sanity, 
// essentially returning a promise and taking arguments like id of product or category
// something like that to modify the GROK query and send the query to sanity and return
// the promise which should be cleared by awaiting at the component or page

import { ToastAndroid } from "react-native";
import storage from "./storage";

const getToken = async () => {
    try {
        const userData = await storage.load({ key: "user" });
        return userData?.token;
    } catch (error) {
        console.log("🚀 ~ getToken ~ error:", error);
        return false;
    }
};

const getStorageData = async (key) => {
    try {
        const data = await storage.load({ key });
        // console.log("🚀 ~ getStorageData ~ data:", data)
        return data;
    } catch (error) {
        switch (error.name) {
            case "NotFoundError":
                return null;
                break;
            case "ExpiredError":
                return null;
                break;
        }
    }
}

const modifyUserSessionStorage = async () => {
    try {
        await storage.remove({ key: "user" });
        await storage.save({ key: "user", expires: 10 });
        ToastAndroid.show(
            "User Session Expired. Please login again",
            ToastAndroid.LONG
        );
        return true;
    } catch (error) {
        return false;
    }
}

export { getToken, getStorageData, modifyUserSessionStorage };