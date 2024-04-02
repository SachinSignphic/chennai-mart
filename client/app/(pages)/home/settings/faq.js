import { Text, Alert, ToastAndroid, TouchableOpacity } from "react-native";
import React, { useRef, useState } from "react";
import { ScrollView, TextInput } from "react-native-gesture-handler";
import { getToken, modifyUserSessionStorage } from "@/utils/fetch";
import { router } from "expo-router";
import { API_URL } from "@/constants";

const faq = () => {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const textAreaRef = useRef();

    const sendFeedBack = async () => {
        try {
            setIsSubmitting(true);
            const feedbackReq = await fetch(API_URL + "/feedback/report", {
                method: "POST",
                body: JSON.stringify({ message: textAreaRef.text }),
                headers: {
                    "Content-Type": "application/json",
                    Auth: await getToken(),
                },
            });
            const feedbackRes = await feedbackReq.json();
            console.log("🚀 ~ sendFeedBack ~ feedbackRes:", feedbackRes)

            if (feedbackReq.status == 200) {
                ToastAndroid.show("Feedback sent successfully!", 3);
                router.back();
            }

            if (feedbackReq.status == 403) {
                const hasUserSessionBeenModified = modifyUserSessionStorage();
                hasUserSessionBeenModified &&
                    router.replace("/login?showname=false");
                return;
            }

            if (feedbackReq.status == 500) {
                Alert.alert("Unexpected Server Error!", feedbackRes.error, [
                    { text: "OK", style: "cancel" },
                ]);
            }
        } catch (error) {
            console.log("🚀 ~ sendFeedBack ~ error:", error)
            Alert.alert('Something went wrong!', error, [{ style: 'cancel', text: "OK" }])
        } finally {
            setIsSubmitting(false);
        }
    }

    return (
        <ScrollView className='px-8 bg-white gap-y-5'>
            <Text className='text-primary text-md modern:text-lg font-nunito-400'>
                Feel free to contact for doubts and report bugs
            </Text>
            <TextInput
                numberOfLines={6}
                multiline={true}
                ref={textAreaRef}
                onChangeText={(text) => textAreaRef.text = text}
                className='rounded-2xl bg-teal/60 p-4'
                style={{ textAlignVertical: "top" }}></TextInput>
            <TouchableOpacity disabled={isSubmitting} onPress={sendFeedBack} className={`bg-primary rounded-lg ${isSubmitting && 'opacity-70'}`}>
                <Text className='font-nunito-400 self-center py-3 text-white text-md modern:text-lg'>
                    Submit
                </Text>
            </TouchableOpacity>
        </ScrollView>
    );
};

export default faq;
