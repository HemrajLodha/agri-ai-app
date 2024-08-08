import * as React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Image } from 'react-native-elements';

function Splash() {
    return (
        <View style={styles.container}>
            <View style={styles.wrapper}>
                <Image
                    source={require("../../../assets/images/app_logo.png")}
                    style={styles.logo}
                />
                <Text style={styles.title}>AgriAI Assist</Text>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#FFF"
    },
    logo: {
        width: 400,
        height: 400
    },
    wrapper: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center"
    },
    title: {
        fontSize: 28,
        fontFamily: "Comfortaa-Bold"
    }
})

export default Splash;