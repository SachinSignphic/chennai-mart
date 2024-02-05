import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import OnboardingScreens from '@/components/OnboardingScreens'
import Divider from '@/components/Divider'
import { MaterialIcons } from '@expo/vector-icons';
import { Link, router } from 'expo-router';

const DOCUMENTS = [
    {
        id: 1,
        title: "Profile Picture",
    },
    {
        id: 2,
        title: "Aadhar Card",
    },
    {
        id: 3,
        title: "PAN Card",
    },
    {
        id: 4,
        title: "Driver's License",
    },
    {
        id: 5,
        title: "Vehicle RC",
    },
]

const DocumentSelectionButton = ({ title, completed }) => {
    return (
        <TouchableOpacity
            onPress={() => router.push('/camera')}
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
    return (
        <OnboardingScreens>
            <Text className='text-secondary w-full mt-5 text-justify font-nunito-400 text-base modern:text-lg'>Upload photos of original documents so we can verify them</Text>
            <Divider text={'PENDING'} />
            {
                DOCUMENTS.map((doc) => <DocumentSelectionButton title={doc.title} key={doc.id} completed={false} />)
            }
            {
                // testing
            }
            <Link href={'/documents-uploaded'}>Skip section</Link>
        </OnboardingScreens>
    )
}

export default uploadDocuments