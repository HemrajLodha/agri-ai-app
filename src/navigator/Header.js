import React from "react";
import { StyleSheet, Text, View } from "react-native";
import colors from "../../assets/colors";

function Header({ navigation, route, options }) {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>AgriAI Assist</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        height: 60,
        backgroundColor: colors.colorPrimary,
        justifyContent: 'center',
        alignItems: 'center'
    },
    logo: {
        height: 48,
        resizeMode: "contain"
    },
    title: {
        color: "#333",
        fontSize: 20,
        fontFamily: "Comfortaa-Bold"
    }
})

export default Header;