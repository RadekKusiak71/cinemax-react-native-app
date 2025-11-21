import { theme } from "@/constants/theme";
import React from "react";
import { StyleSheet, Text, View } from "react-native";

type ErrorScreenProps = {
    message?: string;
};

export const ErrorScreen = ({ message = "An unexpected error occurred." }: ErrorScreenProps) => (
    <View style={styles.center}>
        <Text style={styles.errorText}>{message}</Text>
    </View>
);

const styles = StyleSheet.create({
    center: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: theme.colors.background || '#fff',
        padding: 20,
    },
    errorText: {
        color: "red",
        fontSize: 16,
        textAlign: "center",
    }
});