import { Alert } from "react-native";

export const showAlertMessage = (title, message) => {
    Alert.alert(title, message, [
        { text: 'OK', onPress: () => console.log('OK Pressed') },
    ]);
}