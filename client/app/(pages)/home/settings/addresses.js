import {
    View,
    Text,
    ScrollView,
    TouchableOpacity,
    ToastAndroid,
    TextInput,
} from "react-native";
import React, { useRef, useState } from "react";
import { Feather } from "@expo/vector-icons";
import { router } from "expo-router";
import { API_URL } from "@/constants";
import storage from "@/utils/storage";

const AddressItemCard = ({ name, address }) => {
    return (
        <View className='flex p-3.5 modern:p-6 modern:gap-y-2 mt-2 justify-center border border-primary/10 rounded-xl'>
            <Text className='text-primary font-nunito-400 text-lg modern:text-xl'>
                {name}
            </Text>
            <Text className='text-secondary text-sm modern:text-base font-medium'>
                {address}
            </Text>
            <View className='flex flex-row justify-end items-center'>
                <TouchableOpacity className='px-4 py-2 rounded-xl'>
                    <Feather
                        name='trash-2'
                        size={24}
                        color='red'
                    />
                </TouchableOpacity>
                <TouchableOpacity className='px-4 py-2 rounded-xl'>
                    <Feather
                        name='edit'
                        size={24}
                        color='black'
                    />
                </TouchableOpacity>
            </View>
        </View>
    );
};

const fields = [
    "firstName",
    "lastName",
    "mobile",
    "email",
    "streetLandmark",
    "city",
    "pincode",
    "state",
];

const getToken = async () => {
    try {
        const userData = await storage.load({ key: "user" });
        return userData?.token;
    } catch (error) {
        console.log("🚀 ~ getToken ~ error:", error);
        return false;
    }
};

const addresses = () => {
    const [canEdit, setCanEdit] = useState(false);
    const formRef = useRef({
        city: "",
        email: "",
        firstName: "",
        lastName: "",
        mobile: "",
        pincode: "",
        state: "",
        streetLandmark: "",
    });
    // on page load, read addresses for user from backend
    // put them in global state, just like in ProductSectionSanity.js

    const handleSubmit = async () => {
        // get all refs,
        // purify them(?)
        // POST to endpoint
        // get response
        // put in global state
        const address = {};
        fields.forEach((field) => {
            address[field] = formRef.current[field];
        });
        console.log("🚀 ~ handleSubmit ~ address:", address);
        try {
            const addressReq = await fetch(API_URL + "/address", {
                method: "POST",
                body: JSON.stringify(address),
                headers: {
                    "Content-Type": "application/json",
                    Auth: await getToken(),
                },
            });
            const addressRes = await addressReq.json();
            console.log("🚀 ~ handleSubmit ~ addressRes:", addressRes);
            ToastAndroid.show("Address added!", 2000);
            // now handle save by dispatching event
        } catch (error) {
            console.log("🚀 ~ handleSubmit ~ error:", error);
            ToastAndroid.show("Something went wrong!", 2000);
        } finally {
            setCanEdit(false);
        }
    };

    const handleCancel = () => {
        setCanEdit(false);
    };

    return (
        <ScrollView className='bg-white px-4 modern:px-8 py-2 gap-y-2'>
            {canEdit ? (
                <>
                    {/* Names */}
                    <View className='flex flex-row justify-between gap-x-3'>
                        <View className='gap-y-2 flex-1'>
                            <Text className='font-nunito-400 text-primary text-lg'>
                                First Name:
                            </Text>
                            <TextInput
                                defaultValue='For testing only!'
                                placeholder=''
                                // ref={formRef}
                                onChangeText={(text) =>
                                    (formRef.current.firstName = text)
                                }
                                className='px-4 text-md modern:text-lg py-2 bg-teal rounded-xl'
                            />
                        </View>
                        <View className='gap-y-2 flex-1'>
                            <Text className='font-nunito-400 text-primary text-lg'>
                                Last Name:
                            </Text>
                            <TextInput
                                defaultValue='For testing only!'
                                placeholder=''
                                // ref={formRef}
                                onChangeText={(text) =>
                                    (formRef.current.lastName = text)
                                }
                                className='px-4 text-md modern:text-lg py-2 bg-teal rounded-xl'
                            />
                        </View>
                    </View>

                    {/* Mobile */}
                    <View className='flex gap-y-2'>
                        <Text className='font-nunito-400 text-primary text-lg'>
                            Mobile:
                        </Text>
                        <TextInput
                            defaultValue='82484273'
                            inputMode='numeric'
                            placeholder=''
                            // ref={formRef}
                            onChangeText={(text) =>
                                (formRef.current.mobile = text)
                            }
                            className='px-4 text-md modern:text-lg py-2 bg-teal rounded-xl'
                            keyboardType='phone-pad'
                        />
                    </View>

                    {/* Email */}
                    <View className='flex gap-y-2'>
                        <Text className='font-nunito-400 text-primary text-lg'>
                            Email:
                        </Text>
                        <TextInput
                            defaultValue='mmhmm@mail.com'
                            inputMode='email'
                            placeholder=''
                            // ref={formRef}
                            onChangeText={(text) =>
                                (formRef.current.email = text)
                            }
                            className='px-4 text-md modern:text-lg py-2 bg-teal rounded-xl'
                            keyboardType='email-address'
                        />
                    </View>

                    {/* Street */}
                    <View className='flex gap-y-2'>
                        <Text className='font-nunito-400 text-primary text-lg'>
                            Street/Landmark:
                        </Text>
                        <TextInput
                            defaultValue='For testing only!'
                            inputMode='text'
                            placeholder=''
                            // ref={formRef}
                            onChangeText={(text) =>
                                (formRef.current.streetLandmark = text)
                            }
                            className='px-4 text-md modern:text-lg py-2 bg-teal rounded-xl'
                        />
                    </View>

                    {/* City */}
                    <View className='flex gap-y-2'>
                        <Text className='font-nunito-400 text-primary text-lg'>
                            City:
                        </Text>
                        <TextInput
                            defaultValue='For testing only!'
                            inputMode='text'
                            placeholder=''
                            // ref={formRef}
                            onChangeText={(text) =>
                                (formRef.current.city = text)
                            }
                            className='px-4 text-md modern:text-lg py-2 bg-teal rounded-xl'
                        />
                    </View>

                    {/* Pincode */}
                    <View className='flex gap-y-2'>
                        <Text className='font-nunito-400 text-primary text-lg'>
                            Pincode:
                        </Text>
                        <TextInput
                            defaultValue='600063'
                            inputMode='numeric'
                            keyboardType='phone-pad'
                            placeholder=''
                            // ref={formRef}
                            onChangeText={(text) =>
                                (formRef.current.pincode = text)
                            }
                            className='px-4 text-md modern:text-lg py-2 bg-teal rounded-xl'
                        />
                    </View>

                    {/* State */}
                    <View className='flex gap-y-2'>
                        <Text className='font-nunito-400 text-primary text-lg'>
                            State:
                        </Text>
                        <TextInput
                            defaultValue='For testing only!'
                            inputMode='text'
                            placeholder=''
                            // ref={formRef}
                            onChangeText={(text) =>
                                (formRef.current.state = text)
                            }
                            className='px-4 text-md modern:text-lg py-2 bg-teal rounded-xl'
                        />
                    </View>

                    {/* Buttons */}
                    <View className='flex flex-row justify-around'>
                        <TouchableOpacity
                            className='bg-primary px-3 py-3 rounded-xl mt-5 flex-1'
                            onPress={handleSubmit}>
                            <Text className='text-white text-md modern:text-lg font-nunito-400 self-center'>
                                Save Changes
                            </Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            className='bg-white flex-1 border-1 px-3 py-3 rounded-xl mt-5'
                            onPress={handleCancel}>
                            <Text className='text-primary text-md modern:text-lg font-nunito-400 self-center'>
                                Cancel
                            </Text>
                        </TouchableOpacity>
                    </View>
                </>
            ) : (
                <>
                    <AddressItemCard
                        name={"Z-Block house"}
                        address={
                            "1/129, Z-Block, AD Block, Anna Nagar, Kanakkampalayam, Chennai, TamilNadu 638505, India"
                        }
                    />
                    <AddressItemCard
                        name={"VB Nagar office"}
                        address={
                            "No. 69, 420th Street, VBS Mahal, Hasthinapuram, Chennai, TamilNadu"
                        }
                    />
                    <TouchableOpacity
                        className='bg-primary px-3 py-3 rounded-xl mt-5'
                        onPress={() => {
                            setCanEdit(true);
                        }}>
                        <Text className='text-white text-md modern:text-lg font-nunito-400 self-center'>
                            + Add New
                        </Text>
                    </TouchableOpacity>
                </>
            )}
        </ScrollView>
    );
};

export default addresses;
