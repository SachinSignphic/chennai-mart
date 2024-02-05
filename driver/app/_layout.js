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
            <Stack.Screen name="job-type" options={{
                header: () => <StackHeader headerTitle={'Job Type'} />
            }} />
            <Stack.Screen name="marital-status" options={{
                header: () => <StackHeader headerTitle={'Marital Status'} />
            }} />
        </Stack>
    )
}

export default Layout