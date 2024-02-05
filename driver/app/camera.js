import { Camera, CameraType } from 'expo-camera';
import { router } from 'expo-router';
import { useState, useRef, useEffect } from 'react';
import { Alert, Button, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

export default function App() {
    const cameraRef = useRef();
    const [type, setType] = useState(CameraType.back);
    const [permission, requestPermission] = Camera.useCameraPermissions();
    const [photo, setPhoto] = useState(null)
    const [isCameraReady, setIsCameraReady] = useState(false);

    if (!permission) {
        // Camera permissions are still loading
        return <View />;
    }

    if (!permission.granted) {
        // Camera permissions are not granted yet
        Alert.alert("Camera permission denied!", "We need to access your camera to take pictures", [
            {
                text: "Cancel",
                onPress: router.back
            },
            {
                text: "OK",
                onPress: requestPermission,
                isPreferred: true
            }
        ])
        return (null);
    }

    const toggleCameraType = async () => {
        const x = await cameraRef.current?.getAvailablePictureSizesAsync('16:9')
        console.log("🚀 ~ useEffect ~ x:", x)
        setType(current => (current === CameraType.back ? CameraType.front : CameraType.back));
    }

    const takePicture = async () => {
        const photoData = await cameraRef.current.takePictureAsync({
            base64: true,
            quality: 1,
            isImageMirror: false
        })
        // console.log("🚀 ~ takePicture ~ photoData:", photoData)
        if (isCameraReady) setPhoto(photoData)
    }

    const submitPicture = () => {
        router.back();
    }

    return (
        <View className='flex flex-1 relative bg-black'>
            {
                !photo?
                <>
                    <Camera ref={cameraRef} className='h-[85%]' type={type} onCameraReady={() => setIsCameraReady(true)}>
                    </Camera>
                    <View className='absolute bottom-3 flex flex-row w-full gap-x-6 items-center justify-center bg-transparent mb-6'>
                        <TouchableOpacity className='items-center' onPress={toggleCameraType}>
                            <MaterialCommunityIcons name="camera-flip-outline" size={36} color="white" />
                        </TouchableOpacity>
                        <TouchableOpacity className='self-end items-center' onPress={takePicture}>
                            <View className='w-20 h-20 rounded-full bg-white'></View>
                        </TouchableOpacity>
                    </View>
                </> 
                :
                <View className='flex-1'>
                    <Image source={{ uri: "data:image/jpg;base64," + photo.base64 }} className='w-full h-full' height={photo.height} width={photo.width} resizeMode='cover' />
                    <View className='absolute bottom-3 flex flex-row w-full gap-x-10 items-center justify-center bg-transparent mb-6'>
                        <TouchableOpacity className='items-center' onPress={() => setPhoto(null)}>
                                <MaterialCommunityIcons name="camera-retake-outline" size={38} color="white" />
                        </TouchableOpacity>
                        <TouchableOpacity className='self-end items-center' onPress={submitPicture}>
                                <MaterialCommunityIcons name="check-outline" size={38} color="white" />
                        </TouchableOpacity>
                    </View>
                </View>
            }
        </View>
    );
}