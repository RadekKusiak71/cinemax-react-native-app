import { theme } from "@/constants/theme";
import React from "react";
import { ActivityIndicator, StyleSheet, Text, View } from "react-native";

type LoadingScreenProps = {
    message?: string;
};

export const LoadingScreen = ({ message = "Loading..." }: LoadingScreenProps) => (
    <View style={styles.center}>
        <ActivityIndicator
            size="large"
            color={theme.colors.primary}
            testID="activity-indicator"
        />
        <Text style={styles.text}>{message}</Text>
    </View>
);

const styles = StyleSheet.create({
    center: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: theme.colors.background || '#fff',
    },
    text: {
        marginTop: 12,
        color: theme.colors.textMuted || '#666',
        fontSize: 16,
    }
});