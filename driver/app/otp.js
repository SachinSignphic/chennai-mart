import OnboardingScreens from "@/components/OnboardingScreens"
import { router } from "expo-router"
import { Text } from "react-native"
import OTPTextView from "react-native-otp-textinput"

const otp = () => {
    const handleOTPSubmit = (otp) => {
        if (otp.length === 6) {
            router.push("/loc")
        } 
    }

    return (
        <OnboardingScreens>
            <Text className='text-primary text-center w-full px-2 font-nunito-400 mt-6 mb-4 text-base modern:text-md'>Enter the 6-digit OTP</Text>
            <OTPTextView keyboardType='numeric' inputCount={6} tintColor={'#e6e5e3'} offTintColor={"#e6e5e3"} handleTextChange={handleOTPSubmit} textInputStyle={{
                backgroundColor: "#e6e5e3",
                borderRadius: 8,
                padding: 5
            }} />
        </OnboardingScreens>
    )
}

export default otp