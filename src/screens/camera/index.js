import React, { useEffect, useRef, useState } from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { Camera } from 'react-native-vision-camera';
import colors from '../../../assets/colors';
import FastImage from 'react-native-fast-image';
import { predictCottonDisease, updateImageUri } from '../../redux/slices/diseasePredictSlice';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/native';

const CameraScreen = () => {
    const camera = useRef()
    const navigation = useNavigation()
    const dispatch = useDispatch()
    const [cameraPermission, setCameraPermission] = useState(false);
    const [backCamera, setBackCamera] = useState(null);
    const [imageUri, setImageUri] = useState(null);
    const [captureError, setCaptureError] = useState(null);


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
                setImageUri(`file://${photo.path}`)
            } else {
                setCaptureError('Failed to capture image!');
            }
        } catch (err) {
            console.log("image capture error", err);
            setCaptureError('Failed to capture image!');
        }
    }

    const testLeaf = async () => {
        const data = { uri: imageUri };
        dispatch(updateImageUri(imageUri));
        dispatch(predictCottonDisease(data));
        if (navigation.canGoBack()) {
            navigation.goBack();
        }
    }

    const retakePhoto = async () => {
        setImageUri(null);
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
                <View
                    style={{
                        position: 'absolute',
                        bottom: 36,
                        alignSelf: 'center',
                        flexDirection: "row",
                        justifyContent: "space-between"
                    }}
                    onPress={onCapture}
                >
                    <TouchableOpacity
                        style={styles.button}
                        onPress={testLeaf}
                    >
                        <Text
                            style={styles.button_text}
                        >
                            {`TEST LEAF\nपत्ती का परीक्षण करें!`}
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={styles.button}
                        onPress={retakePhoto}
                    >
                        <Text
                            style={styles.button_text}
                        >
                            {`RETAKE PHOTO\nफोटो दोबारा लें!`}
                        </Text>
                    </TouchableOpacity>
                </View>
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
                        width: 100,
                        height: 100,
                        borderRadius: 100,
                        borderRadius: 100,
                        borderWidth: 6,
                        borderColor: "#AED581"
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
    button: {
        width: "40%",
        backgroundColor: "#C5E1A5",
        marginHorizontal: 16,
        padding: 4,
        borderRadius: 4
    },
    button_text: {
        color: "#212121",
        fontSize: 16,
        fontWeight: "800",
        textAlign: "center"
    }
})

export default CameraScreen;