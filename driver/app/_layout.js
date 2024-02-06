import StackHeader from "@/components/StackHeader"
import { Stack } from "expo-router"
import React from 'react'

const Layout = () => {
    return (
        <Stack>
            <Stack.Screen name="index" options={{
                headerShown: false
            }} />
            <Stack.Screen name="mobile" options={{
                header: () => <StackHeader headerTitle={'Mobile Number'} />
            }} />
            <Stack.Screen name="otp" options={{
                header: () => <StackHeader headerTitle={'OTP'} />
            }} />
            <Stack.Screen name="loc" options={{
                header: () => <StackHeader headerTitle={'Your Location'} />
            }} />
            <Stack.Screen name="choose-city" options={{
                header: () => <StackHeader headerTitle={'Choose City'} />
            }} />
            <Stack.Screen name="choose-jobtype" options={{
                header: () => <StackHeader headerTitle={'Job Type'} />
            }} />
            <Stack.Screen name="marital-status" options={{
                header: () => <StackHeader headerTitle={'Marital Status'} />
            }} />
            <Stack.Screen name="choose-vehicle" options={{
                header: () => <StackHeader headerTitle={'Choose Vehicle'} />
            }} />
            <Stack.Screen name="choose-shift" options={{
                header: () => <StackHeader headerTitle={'Choose Shift'} />
            }} />
            <Stack.Screen name="choose-dayoff" options={{
                header: () => <StackHeader headerTitle={'Choose Day off'} />
            }} />
            <Stack.Screen name="upload-documents" options={{
                header: () => <StackHeader headerTitle={'Upload Documents'} />
            }} />
            <Stack.Screen name="camera" options={{
                headerShown: false
            }} />
            <Stack.Screen name="documents-uploaded" options={{
                headerShown: false
            }} />
            <Stack.Screen name="documents-verified" options={{
                headerShown: false
            }} />
            <Stack.Screen name="address" options={{
                header: () => <StackHeader headerTitle={'Current Address'} />
            }} />
            <Stack.Screen name="emergency-contact" options={{
                header: () => <StackHeader headerTitle={'Emergency Contact'} />
            }} />
            <Stack.Screen name="bank-details" options={{
                header: () => <StackHeader headerTitle={'Bank Details'} />
            }} />
            <Stack.Screen name="dashboard" options={{
                headerShown: false
            }} />
        </Stack>
    )
}

export default Layout