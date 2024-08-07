import React, { useEffect, useRef, useState } from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { Camera } from 'react-native-vision-camera';
import colors from '../../../assets/colors';
import FastImage from 'react-native-fast-image';

const CameraScreen = () => {
    const camera = useRef()
    const [cameraPermission, setCameraPermission] = useState(false);
    const [backCamera, setBackCamera] = useState(null);
    const [imageUri, setImageUri] = useState(null);
    const [captureError, setCaptureError] = useState(null);

    console.log("photo imageUri", imageUri);

    const fetchDevices = async () => {
        const availableDevices = Camera.getAvailableCameraDevices();
        if (availableDevices?.length > 0) {
            const backDevice = availableDevices.find(device => device.position === 'back');
            setBackCamera(backDevice);
        }
    };

    const onCapture = async () => {
        try {
            const photo = await camera.current.takePhoto();
            if (photo?.path) {
                setImageUri(photo.path)
            } else {
                setCaptureError('Failed to capture image!');
            }
        } catch (err) {
            console.log("image capture error", err);
            setCaptureError('Failed to capture image!');
        }
    }

    useEffect(() => {
        (async () => {
            await fetchDevices();
            const permissionStatus = Camera.getCameraPermissionStatus();
            if (permissionStatus === "granted") {
                setCameraPermission(true)
            } else {
                console.log("permissionStatus", permissionStatus)
                const cameraPermission = await Camera.requestCameraPermission();
                if (cameraPermission !== 'authorized') {
                    setCameraPermission(false)
                    console.log('Camera permission not granted!');
                } else {
                    setCameraPermission(true)
                }
            }
        })();
    }, []);

    if (!backCamera || !cameraPermission) {
        return (
            <View style={styles.container}>
                <View style={styles.wrapper}>
                    <Text style={styles.error_text}>
                        {!cameraPermission ? "Camera permission not granted!" : !backCamera ? "Camera not available!" : ""}
                    </Text>
                </View>
            </View>
        );
    }

    if (!!imageUri) {
        return (
            <View>
                <FastImage
                    style={{ width: "100%", height: "100%", resizeMode: "cover" }}
                    source={{ uri: imageUri }}
                />
                <TouchableOpacity
                    style={{ position: 'absolute', bottom: 36, alignSelf: 'center', flexDirection: "row", justifyContent: "space-between" }}
                    onPress={onCapture}
                >
                    <Text
                        style={styles.button_text}
                    >
                        TEST
                    </Text>
                    <Text
                        style={styles.button_text}
                    >
                        RETAKE
                    </Text>
                </TouchableOpacity>
            </View>
        );
    }

    return (
        <View>
            <Camera
                style={{ width: "100%", height: "100%" }}
                device={backCamera}
                isActive={true}
                photo={true}
                video={false}
                ref={camera}
            />
            <TouchableOpacity
                style={{ position: 'absolute', bottom: 36, alignSelf: 'center' }}
                onPress={onCapture}
            >
                <View
                    style={{
                        backgroundColor: "#FFF",
                        width: 80,
                        height: 80,
                        borderRadius: 80
                    }}
                />
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    wrapper: {
        width: "100%",
        height: "100%",
        alignItems: "center",
        justifyContent: "center"
    },
    error_text: {
        fontSize: 20,
        fontWeight: "800",
        color: colors.textColorPrimary
    },
    button_text: {
        color: "#FFF",
        fontSize: 18
    }
})

export default CameraScreen;