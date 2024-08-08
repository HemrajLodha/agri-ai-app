import * as React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import colors from '../../../assets/colors';
import FastImage from 'react-native-fast-image';
import { Icon, LinearProgress } from 'react-native-elements';
import { useNavigation } from '@react-navigation/native';
import { useSelector } from 'react-redux';

function Home() {

    const navigate = useNavigation();

    const diseaseProdictProps = useSelector(state => state.diseasePredictProps)

    console.log("diseaseProdictProps", diseaseProdictProps)


    const onClickCamera = () => {
        navigate.navigate("CameraScreen");
    }

    const onClickGallery = () => {

    }


    return (
        <View style={styles.container}>
            <View style={styles.wrapper}>
                <Text style={styles.title}>
                    {`Cotton Disease Test\nकपास रोग परीक्षण`}
                </Text>
                <View style={styles.image_container}>
                    {
                        !!diseaseProdictProps.imageUri ?
                            <FastImage
                                style={styles.image_wrapper}
                                source={{ uri: diseaseProdictProps.imageUri }}
                            /> : <>
                                <Text style={styles.image_placeholder}>
                                    Using buttons below, Please click cotton leaf picture from camera or choose from gallery.
                                </Text>
                                <Text style={styles.image_placeholder}>
                                    कृपया नीचे दिए गए बटन का उपयोग करके कैमरे से कपास के पत्ते की तस्वीर क्लिक करें या गैलरी से चुनें!
                                </Text>
                            </>
                    }
                </View>
                <View style={styles.picker_wrapper}>
                    <TouchableOpacity
                        style={styles.button_wrapper}
                        onPress={onClickCamera}
                        disabled={diseaseProdictProps.loading}
                    >
                        <Icon
                            type={"material-community"}
                            name='camera'
                            size={60}
                            color={"#9CCC65"}
                        />
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={styles.button_wrapper}
                        onPress={onClickGallery}
                        disabled={diseaseProdictProps.loading}
                    >
                        <Icon
                            type={"material-community"}
                            name='folder'
                            size={60}
                            color={"#9CCC65"}
                        />
                    </TouchableOpacity>
                </View>
                <View style={styles.predict_wrapper}>
                    {diseaseProdictProps.loading ?
                        <>
                            <Text style={styles.progress_text}>
                                {`Testing in progress, Please wait.\nपरीक्षण प्रगति पर है, कृपया प्रतीक्षा करें!`}
                            </Text>
                            <LinearProgress
                                style={styles.predict_progress}
                                color='#9CCC65'
                            />
                        </> : null
                    }
                    {(!diseaseProdictProps.loading && diseaseProdictProps.status && diseaseProdictProps.data) ?
                        <View style={styles.result_container}>
                            <View style={styles.result_wrapper}>
                                <Text style={[
                                    styles.result_text,
                                    { width: "32%", textAlign: "left" }
                                ]}>
                                    {`Test Prediction\nपरिक्षण अनुमान`}
                                </Text>
                                <View
                                    style={{
                                        width: "15%"
                                    }}
                                >
                                    <Icon
                                        type={"material-community"}
                                        name='arrow-right'
                                        size={30}
                                        color={colors.textColorPrimary}
                                    />
                                </View>
                                <Text style={[
                                    styles.result_text,
                                    { width: "48%", textAlign: "left" }
                                ]}>
                                    {`${diseaseProdictProps.data.english}\n${diseaseProdictProps.data.hindi}`}
                                </Text>
                            </View>
                            <View style={styles.result_wrapper}>
                                <Text style={[
                                    styles.result_text,
                                    { width: "32%", textAlign: "left" }
                                ]}>
                                    {`Test Prediction\nपरिक्षण अनुमान`}
                                </Text>
                                <View
                                    style={{
                                        width: "15%"
                                    }}
                                >
                                    <Icon
                                        type={"material-community"}
                                        name='arrow-right'
                                        size={30}
                                        color={colors.textColorPrimary}
                                    />
                                </View>
                                <Text style={[
                                    styles.result_text,
                                    { width: "48%", textAlign: "left" }
                                ]}>
                                    {`${diseaseProdictProps.data.probability}%`}
                                </Text>
                            </View>
                        </View>
                        : null
                    }
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#FFF",
        paddingHorizontal: 16
    },
    wrapper: {
        flex: 1,
        alignItems: "center"
    },
    title: {
        fontSize: 24,
        color: colors.textColorPrimary,
        fontWeight: "bold",
        textAlign: "center",
        marginHorizontal: 16,
        marginVertical: 24
    },
    image_container: {
        width: "100%",
        height: "40%",
        borderWidth: 8,
        borderColor: "#F1F8E9",
        marginVertical: 12,
        borderRadius: 6,
        overflow: "hidden",
        alignItems: "center",
        justifyContent: "center"
    },
    image_wrapper: {
        width: "100%",
        height: "100%",
        resizeMode: "cover"
    },
    image_placeholder: {
        fontSize: 20,
        color: colors.textColorPlaceholder,
        textAlign: "center",
        paddingHorizontal: 16,
        marginBottom: 12
    },
    predict_wrapper: {
        marginVertical: 16,
        alignItems: "center"
    },
    predict_progress: {
        width: 100,
        marginVertical: 4
    },
    progress_text: {
        fontSize: 16
    },
    picker_wrapper: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginVertical: 16
    },
    button_wrapper: {
        paddingHorizontal: 16,
        paddingVertical: 12,
        backgroundColor: "#F1F8E9",
        marginHorizontal: 16,
        borderRadius: 16
    },
    result_container: {
        width: "100%",
        backgroundColor: "#F9FBE7",
        padding: 6,
        borderRadius: 6
    },
    result_wrapper: {
        width: "100%",
        flexDirection: "row",
        marginVertical: 8,
        justifyContent: "space-between",
        alignItems: "center"
    },
    result_text: {
        fontSize: 16,
        color: colors.textColorPrimary
    },
})

export default Home;