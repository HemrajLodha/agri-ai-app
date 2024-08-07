import React from "react";
import { Button, StyleSheet, Text, View } from "react-native";
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
    title: {
        color: colors.textColorSecondary,
        fontSize: 20,
        fontWeight: 'bold'
    }
})

export default Header;