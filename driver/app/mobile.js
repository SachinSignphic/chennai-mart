import OnboardingScreens from "@/components/OnboardingScreens"
import ProceedButton from "@/components/ProceedButton"
import { IS_DEV } from "@/constants"
import { Link, router } from "expo-router"
import { useState } from "react"
import { Text, View, TextInput, ToastAndroid } from "react-native"

const mobile = () => {
    const [mobile, setMobile] = useState('');

    const handleMobileSubmit = (text) => {
        if (text.length !== 10 && !IS_DEV) return ToastAndroid.show("Invalid mobile number!", 2);
        router.push(`/otp?phone=${mobile}`);
    }

    return (
        <OnboardingScreens>
            <Text className='text-primary text-left w-full px-2 font-nunito-400 mt-6 text-base modern:text-md'>Phone number*</Text>
            <View className='relative flex w-full mt-2'>
                <TextInput inputMode="numeric" value={mobile} onChangeText={setMobile} className='bg-slate-100 border-primary/40 rounded-md w-full px-12 py-3 text-primary font-nunito-400 text-base modern:text-lg' />
                <Text className='absolute top-[22%] z-20 left-[3%] text-primary font-nunito-400 text-base modern:text-lg'>+91 </Text>
            </View>
            <Text className='mt-auto mb-3 w-full text-left px-2 text-gray-400'>By continuing you agree to terms of service & privacy policy</Text>
            <ProceedButton action={() => handleMobileSubmit(mobile)} innerText={"Get OTP"} />
            {
                IS_DEV && <Link href={'/home'}>Test skip</Link>
            }
        </OnboardingScreens>
    )
}

export default mobile