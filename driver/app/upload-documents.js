import { View, Text, TouchableOpacity, ToastAndroid } from 'react-native'
import React, { useEffect, useState } from 'react'
import OnboardingScreens from '@/components/OnboardingScreens'
import Divider from '@/components/Divider'
import { MaterialIcons } from '@expo/vector-icons';
import { Link, router } from 'expo-router';
import { IS_DEV } from '@/constants';
import ProceedButton from '@/components/ProceedButton';
import AsyncStorage from '@react-native-async-storage/async-storage';

const DOCUMENTS = [
    {
        id: 1,
        title: "Profile Picture",
        slug: 'profile-picture'
    },
    {
        id: 2,
        title: "Aadhar Card",
        slug: 'aadhar-card'
    },
    {
        id: 3,
        title: "PAN Card",
        slug: 'pan-card'
    },
    {
        id: 4,
        title: "Driver's License",
        slug: 'drivers-license'
    },
    {
        id: 5,
        title: "Vehicle RC",
        slug: 'vehicle-rc'
    },
]

const DocumentSelectionButton = ({ title, completed, cameraKey }) => {

    return (
        <TouchableOpacity
            onPress={() => router.push('/camera?key=' + cameraKey)}
            activeOpacity={0.8} className='flex w-full flex-row p-4 my-3 items-center bg-slate-50 rounded-md'>
            {completed ? <MaterialIcons name="check-circle" size={28} color="green" /> : <MaterialIcons name="pending-actions" size={24} color="#5b5b5c" />}
            <Text className={`${'text-primary/90'} ml-5 font-nunito-400 text-lg modern:text-xl`}>{title}</Text>
            {!completed && <View className="ml-auto">
                <MaterialIcons name="chevron-right" size={32} color="black" />
            </View>}
        </TouchableOpacity>
    )
}

const uploadDocuments = () => {
    const [documentStatuses, setDocumentStatuses] = useState(null);

    useEffect(() => {
        const getDocumentUploadedStatus = async () => {
            try {
                const statuses = await AsyncStorage.multiGet(DOCUMENTS.map(document => document.slug));
                setDocumentStatuses(statuses);
                console.log("🚀 ~ getDocumentUploadedStatus ~ statuses:", statuses)
            } catch (error) {
                console.log("doc select", error);
                ToastAndroid.show("Error in saving data. Please contact help from website", ToastAndroid.LONG);
            }
        }

        getDocumentUploadedStatus();
    }, [])

    return (
        <OnboardingScreens>
            <Text className='text-secondary w-full my-5 text-justify font-nunito-400 text-base modern:text-lg'>Upload photos of original documents so we can verify them</Text>
            <Divider text={'PENDING'} />
            {
                DOCUMENTS.map((doc) => <DocumentSelectionButton title={doc.title} key={doc.id} completed={documentStatuses?.find(document => document[0] === doc.slug)[1] === "true"} cameraKey={doc.slug} />)
            }
            {
                // testing
                IS_DEV && <Link href={'/home'}>Skip section</Link>
            }
            {
                documentStatuses?.every(document => document[1] === "true") && <ProceedButton autoMarginTop={true} innerText={'Continue'} routeName={'/documents-uploaded'} />
            }
        </OnboardingScreens>
    )
}

export default uploadDocuments