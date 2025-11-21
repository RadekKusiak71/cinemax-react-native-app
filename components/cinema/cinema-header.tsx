import { theme } from "@/constants/theme";
import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

type CinemaHeaderProps = {
    cinemaName?: string;
    onChange: () => void;
};

const CinemaHeader = ({ cinemaName, onChange }: CinemaHeaderProps) => {
    return (
        <View style={styles.header}>
            <View>
                <Text style={styles.headerTitle}>Now Showing</Text>
                <Text style={styles.subHeader}>{cinemaName || 'Select a Cinema'}</Text>
            </View>
            <TouchableOpacity
                style={styles.changeCinemaButton}
                onPress={onChange}
                accessibilityRole="button"
                accessibilityLabel="Change Cinema"
            >
                <Text style={styles.changeCinemaText}>Change</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 16,
        paddingVertical: 12,
        borderBottomWidth: 1,
        borderBottomColor: '#eee',
        backgroundColor: theme.colors.background || '#fff',
    },
    headerTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        color: theme.colors.textPrimary || '#000',
    },
    subHeader: {
        fontSize: 14,
        color: theme.colors.textMuted || '#666',
        marginTop: 2,
    },
    changeCinemaButton: {
        backgroundColor: '#f0f0f0',
        paddingHorizontal: 12,
        paddingVertical: 6,
        borderRadius: 20,
    },
    changeCinemaText: {
        fontSize: 12,
        fontWeight: '600',
        color: theme.colors.primary || '#007AFF',
    },
});

export default CinemaHeader;