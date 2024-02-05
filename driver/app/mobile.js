import OnboardingScreens from "@/components/OnboardingScreens"
import ProceedButton from "@/components/ProceedButton"
import { router } from "expo-router"
import { Text, View, TextInput, TouchableOpacity } from "react-native"


const mobile = () => {
    return (
        <OnboardingScreens>
            <Text className='text-primary text-left w-full px-2 font-nunito-400 mt-6 text-base modern:text-md'>Phone number*</Text>
            <View className='relative flex w-full mt-2'>
                <TextInput inputMode="numeric" className='bg-slate-100 border-primary/40 rounded-md w-full px-12 py-3 text-primary font-nunito-400 text-base modern:text-lg' />
                <Text className='absolute top-[22%] z-20 left-[3%] text-primary font-nunito-400 text-base modern:text-lg'>+91 </Text>
            </View>
            <Text className='mt-auto mb-3 w-full text-left px-2 text-gray-400'>By continuing you agree to terms of service & privacy policy</Text>
            <ProceedButton routeName={'/otp'} innerText={"Get OTP"} />
        </OnboardingScreens>
    )
}

export default mobile