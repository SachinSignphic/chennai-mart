import {
    View,
    Text,
    ScrollView,
    TouchableOpacity,
    ToastAndroid,
    TextInput,
    Alert,
    ActivityIndicator,
} from "react-native";
import React, { useEffect, useRef, useState } from "react";
import { Feather } from "@expo/vector-icons";
import { API_URL } from "@/constants";
import { getToken, modifyUserSessionStorage } from "@/utils/fetch";
import { useDispatch, useSelector } from "react-redux";
import storage from "@/utils/storage";
import {
    addAddress,
    deleteAddress,
    populateAddresses,
} from "@/context/address";
import { router } from "expo-router";

const AddressItemCard = ({ name, address, action, isDeleting }) => {
    return (
        <View
            className={`flex p-3.5 modern:p-6 modern:gap-y-2 mt-2 justify-center border border-primary/10 rounded-xl ${
                isDeleting && "opacity-70"
            }`}>
            <Text className='text-primary font-nunito-400 text-lg modern:text-xl'>
                {name}
            </Text>
            <Text className='text-secondary text-sm modern:text-base font-medium'>
                {address}
            </Text>
            <View className='flex flex-row justify-end items-center'>
                <TouchableOpacity
                    onPress={action}
                    disabled={isDeleting}
                    className={`${
                        isDeleting && "opacity-60"
                    } px-4 py-2 rounded-xl`}>
                    <Feather
                        name='trash-2'
                        size={24}
                        color='red'
                    />
                </TouchableOpacity>
                {/* <TouchableOpacity className='px-4 py-2 rounded-xl'>
                    <Feather
                        name='edit'
                        size={24}
                        color='black'
                    />
                </TouchableOpacity> */}
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
    const addressData = useSelector((state) => state.address);
    const dispatch = useDispatch();
    const [isLoading, setIsLoading] = useState(
        addressData.allAddresses.length < 1
    );
    const [isDeleting, setIsDeleting] = useState("");

    useEffect(() => {
        const fetchUserAddresses = async () => {
            try {
                const addressRequest = await fetch(API_URL + "/address", {
                    method: "GET",
                    headers: {
                        Auth: await getToken(),
                    },
                });
                const addressResponse = await addressRequest.json();
                console.log(
                    "🚀 ~ fetchUserAddresses ~ addressResponse:",
                    addressResponse
                );

                if (addressRequest.status == 403) {
                    await storage.remove({ key: "user" });
                    await storage.save({ key: "user", expires: 10 });
                    ToastAndroid.show(
                        "User Session Expired. Please login again",
                        ToastAndroid.LONG
                    );
                    router.replace("/login?showname=false");
                    return;
                }

                if (addressRequest.status == 200) {
                    dispatch(
                        populateAddresses(
                            addressResponse.data.map((addr) => ({
                                ...addr,
                                id: addr._id,
                            }))
                        )
                    );
                }
            } catch (error) {
                console.log("🚀 ~ fetchUserAddresses ~ error:", error);
                Alert.alert('Unexpected error', 'We did not expect that', [{ style: "cancel", text: "OK" }])
                return;
            } finally {
                setIsLoading(false);
            }
        };

        if (addressData.allAddresses.length == 0) fetchUserAddresses();
    }, []);

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
            const addressReq = await fetch(API_URL + "/address/new", {
                method: "POST",
                body: JSON.stringify(address),
                headers: {
                    "Content-Type": "application/json",
                    Auth: await getToken(),
                },
            });
            const addressRes = await addressReq.json();
            console.log("🚀 ~ handleSubmit ~ addressRes:", addressRes);

            if (addressReq.status == 200) {
                ToastAndroid.show("Address added!", ToastAndroid.LONG);
                addressRes.data.id = addressRes.data._id;
                delete addressRes.data._id;
                dispatch(addAddress(addressRes.data));
            }

            if (addressReq.status == 403) {
                const hasUserSessionBeenModified = modifyUserSessionStorage();
                hasUserSessionBeenModified &&
                    router.replace("/login?showname=false");
                return;
            }

            if (addressReq.status == 500) {
                Alert.alert("Unexpected Server Error!", addressRes.error, [
                    { text: "OK", style: "cancel" },
                ]);
            }
        } catch (error) {
            console.log("🚀 ~ handleSubmit ~ error:", error);
            Alert.alert("Something went wrong!", "Please report this error", [
                { text: "OK", style: "cancel" },
            ]);
        } finally {
            setCanEdit(false);
        }
    };

    const handleCancel = () => {
        setCanEdit(false);
    };

    const handleDelete = async (addressId) => {
        try {
            setIsDeleting(addressId);
            const addressReq = await fetch(API_URL + "/address/delete", {
                method: "POST",
                body: JSON.stringify({ addressId }),
                headers: {
                    "Content-Type": "application/json",
                    Auth: await getToken(),
                },
            });
            const addressRes = await addressReq.json();
            console.log("🚀 ~ handleSubmit ~ addressRes:", addressRes);

            if (addressReq.status == 200) {
                ToastAndroid.show("Address deleted!", 3);
                dispatch(deleteAddress(addressId));
            }

            if (addressReq.status == 404) {
                ToastAndroid.show("Could not find address!", 3);
            }

            if (addressReq.status == 403) {
                const hasUserSessionBeenModified = modifyUserSessionStorage();
                hasUserSessionBeenModified &&
                    router.replace("/login?showname=false");
                return;
            }

            if (addressReq.status == 500) {
                Alert.alert("Unexpected Server Error!", addressRes.error, [
                    { text: "OK", style: "cancel" },
                ]);
            }
        } catch (error) {
            console.log("🚀 ~ handleDelete ~ error:", error);
        } finally {
            setIsDeleting("");
        }
    };

    return (
        <ScrollView className='bg-white px-4 modern:px-8 py-2 gap-y-2 pb-12'>
            {isLoading && <ActivityIndicator size={40} />}
            {canEdit ? (
                <>
                    {/* Names */}
                    <View className='flex flex-row justify-between gap-x-3'>
                        <View className='gap-y-2 flex-1'>
                            <Text className='font-nunito-400 text-primary text-lg'>
                                First Name:
                            </Text>
                            <TextInput
                                // defaultValue='For testing only!'
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
                                // defaultValue='For testing only!'
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
                            // defaultValue='82484273'
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
                            // defaultValue='mmhmm@mail.com'
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
                            // defaultValue='For testing only!'
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
                            // defaultValue='For testing only!'
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
                            // defaultValue='600063'
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
                            // defaultValue='For testing only!'
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
                addressData.allAddresses.map((addr, i) => (
                    <AddressItemCard
                        key={i}
                        name={addr.firstName}
                        isDeleting={addr._id == isDeleting}
                        action={() => handleDelete(addr._id)}
                        address={[
                            addr.streetLandmark,
                            addr.city,
                            addr.state,
                        ].join(", ")}
                    />
                ))
            )}
            {!canEdit && (
                <TouchableOpacity
                    className='bg-primary px-3 py-3 rounded-xl mt-5'
                    onPress={() => {
                        setCanEdit(true);
                    }}>
                    <Text className='text-white text-md modern:text-lg font-nunito-400 self-center'>
                        + Add New
                    </Text>
                </TouchableOpacity>
            )}
        </ScrollView>
    );
};

export default addresses;
